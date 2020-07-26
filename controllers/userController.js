const User = require('../modals/userModal');
const multer = require('multer');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
   deleteOne,
   updateOne,
   createOne,
   getOne,
   getAll
} = require('./factoryController');

const multerStore = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, 'public/img/users');
   },
   filename(req, file, callback) {
      const ext = file.mimetype.split('/')[1];
      callback(null, `user-${req.user.id}-${Date.now()}.${ext}`);
   }
});

const multerFilter = (req, file, callback) => {
   if (file.mimetype.startsWith('image')) {
      callback(null, true);
   } else {
      callback(new AppError('Not a valid image', 400), false);
   }
};
const upload = multer({
   storage: multerStore,
   fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('photo');
const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
   // 1) Create error if user POSTs password data
   if (req.body.password || req.body.passwordConfirm) {
      return next(
         new AppError(
            'This route is not for password updates. Please use /updateMyPassword.',
            400
         )
      );
   }

   // 2) Filtered out unwanted fields names that are not allowed to be updated
   const filteredBody = filterObj(req.body, 'name', 'email');
   if (req.file) filteredBody.photo = req.file.filename;

   // 3) Update user document
   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
   });

   res.status(200).json({
      status: 'success',
      data: {
         user: updatedUser
      }
   });
});

exports.getMe = (req, res, next) => {
   req.params.id = req.user.id;
   next();
};
exports.deleteMe = catchAsync(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user.id, { active: false });
   res.status(204).json({
      status: 'success'
   });
});
