const Tour = require('../modals/tourModel');
const Booking = require('../modals/bookingModal');
const User = require('../modals/userModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
   // 1 Get tour data from collection
   const tours = await Tour.find();
   // 2 Build template
   // 3 Render template
   res.status(200).render('overview', {
      tours,
   });
});

exports.getAccount = (req, res) => {
   res.status(200).render('account', {
      title: 'Your account',
      user: req.user,
   });
};

exports.getTour = catchAsync(async (req, res, next) => {
   const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user',
   });
   if (!tour) {
      return next(new AppError('No Tour found with this name', 404));
   }
   res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour,
   });
});

exports.getLogin = async (req, res) => {
   res.status(200).render('login', {
      title: 'Login',
   });
};
exports.updateUserData = catchAsync(async (req, res, next) => {
   const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
         name: req.body.name,
         email: req.body.email,
      },
      {
         new: true,
         runValidators: true,
      }
   );
   res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser,
   });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
   // 1) Find Bookings
   const bookings = await Booking.find({ user: req.user.id });
   // 2) Findings tours using IDs
   const toursId = bookings.map((el) => {
      return el.tour;
   });
   const tours = await Tour.find({ _id: { $in: toursId } });

   res.status(200).render('overview', {
      title: 'Booked Tours',
      tours,
   });
});
