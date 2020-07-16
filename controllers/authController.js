const jwt = require('jsonwebtoken');
const User = require('../modals/userModal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const siginToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};

exports.signup = catchAsync(async (req, res, next) => {
   const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });
   const token = siginToken(newUser._id);
   res.status(201).json({
      status: 'success',
      token,
      data: {
         user: newUser,
      },
   });
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
   const token = siginToken(user._id);
   res.status(200).json({
      status: 'success',
      token,
   });
});

exports.protect = catchAsync(async (req, res, next) => {
   //Get Token
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }
   if (!token) {
      return next(new AppError('Not authorized', 401));
   }
   //Validate
   //Check if user is authorized
   //Check if user change password after token issue
   next();
});
