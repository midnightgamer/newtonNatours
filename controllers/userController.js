const User = require('../modals/userModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObject = (obj, ...fileds) => {
   const newObj = {};
   Object.keys(obj).forEach((key) => {
      if (fileds.includes(key)) newObj[key] = obj[key];
   });
   return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
   const users = await User.find();
   // SEND RESPONSE
   res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
         users,
      },
   });
});
exports.getUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
   });
};
exports.createUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
   });
};
exports.updateUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
   });
};
exports.deleteUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
   });
};

exports.updateMe = catchAsync(async (req, res, next) => {
   //Create error for password changes
   if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('You cannot update password', 400));
   }
   //Update user data
   const filteredBody = filterObject(req.body, 'name', 'email');
   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidation: true,
   });

   res.status(200).json({
      status: 'success',
      data: {
         user: updatedUser,
      },
   });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user.id, { active: false });
   res.status(204).json({
      status: 'success',
   });
});
