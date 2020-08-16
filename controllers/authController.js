const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../modals/userModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

const siginToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};

const createAndSendToken = (user, statusCode, req, res) => {
   const token = siginToken(user._id);
   const options = {
      expires: new Date(
         Date.now() + process.env.JWT_COOKI_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      'access-control-expose-headers': 'Set-Cookie',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      // TODO enable when in production
      // secure: req.secure || req.headers('x-forward-proto') === 'https',
   };

   res.cookie('jwt', token, options);
   // To hide password
   user.password = undefined;
   res.status(statusCode).json({
      status: 'success',
      token,
      data: {
         user,
      },
   });
};
exports.signup = catchAsync(async (req, res, next) => {
   const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangeAt: req.body.passwordChangeAt,
      role: this.role,
   });
   if (
      !req.body.email ||
      !req.body.name ||
      req.body.password ||
      req.body.passwordConfirm
   ) {
      return next(new AppError('Please fill all required fields', 400));
   }
   if (req.body.password !== req.body.passwordConfirm) {
      return next(new AppError('Password and Confirm password not match', 400));
   }
   const url = `${req.protocol}://${req.get('host')}/me`;
   await new Email(newUser, url).sendWelcome();
   createAndSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;
   //   1) Check email and password exist
   if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
   }
   //   2) Check if user exists and password is correct
   const user = await User.findOne({ email }).select('+password');

   if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Invalid email or password', 401));
   }
   //   3) If everything okay , send jwt
   createAndSendToken(user, 200, req, res);
});
exports.logout = catchAsync(async (req, res, next) => {
   res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
   });
   res.status(200).json({
      status: 'success',
   });
});
exports.protect = catchAsync(async (req, res, next) => {
   // Get Token
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
   }
   if (!token) {
      return next(new AppError('Not authorized', 401));
   }
   // Verification token
   const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
   );
   // Check if user is authorized
   const user = await User.findById(decodedToken.id);

   if (!user) {
      return next(new AppError('The user does not exists', 401));
   }
   // Check if user change password after token issue
   if (user.changedPassword(decodedToken.iat)) {
      return next(
         new AppError('The user has changed password , Please try again', 401)
      );
   }
   req.user = user;
   res.locals.user = user;
   next();
});

exports.isLoggedIn = async (req, res, next) => {
   // Get Token
   if (req.cookies.jwt) {
      try {
         // Verification token
         const decodedToken = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
         );
         // Check if user is authorized
         const user = await User.findById(decodedToken.id);

         if (!user) {
            return next();
         }
         // Check if user change password after token issue
         if (user.changedPassword(decodedToken.iat)) {
            return next();
         }
         res.locals.user = user;
         return next();
      } catch (e) {
         return next();
      }
   }
   next();
};

exports.restrictTo = (...role) => {
   return (req, res, next) => {
      if (!role.includes(req.user.role)) {
         return next(new AppError('You are not authorized', 403));
      }
      next();
   };
};

exports.resetPassword = catchAsync(async (req, res, next) => {
   // 1)Get user based on token
   const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
   const user = await User.findOne({
      passwordToken: hashedToken,
      passwordResetExpiresAt: { $gt: Date.now() },
   });
   // 2) If user exists and token is not expired then set password
   if (!user) {
      return next(new AppError('Token is not expired or invalid', 400));
   }
   user.password = req.body.password;
   user.passwordConfirm = req.body.passwordConfirm;
   user.passwordResetExpiresAt = undefined;
   user.passwordToken = undefined;
   await user.save();
   // 3) Update ChangePasswordAT
   // 4) Log user in
   createAndSendToken(user, 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
   // 1)Get user based on email
   const user = await User.findOne({
      email: req.body.email,
   });
   if (!user) {
      return next(
         new AppError('The user does not exists with this email', 404)
      );
   }
   // 2)Generate random reset token
   const resetToken = user.createPasswordToken();
   await user.save({ validateBeforeSave: false });
   // 3)Send reset token
   try {
      const resetURL = `${req.protocol}://${req.host}/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
      res.status(200).json({
         status: 'success',
      });
   } catch (e) {
      user.passwordToken = undefined;
      user.passwordResetExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
         new AppError(
            'There was problem while sending mail , please try again later',
            500
         )
      );
   }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
   //   1) Get user
   const user = await User.findById(req.user.id).select('+password');
   // Change password
   if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
      return next(new AppError('Your current password is wrong', 401));
   }
   user.password = req.body.password;
   user.passwordConfirm = req.body.passwordConfirm;
   await user.save();
   createAndSendToken(user, 201, req, res);
});
