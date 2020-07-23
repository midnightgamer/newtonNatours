const Review = require('../modals/reviewModal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { deleteOne, updateOne, createOne } = require('./factoryController');

exports.getAllReviews = catchAsync(async (req, res, next) => {
   let filter = {};
   if (req.params.tourId) filter = { tour: req.params.tourId };
   const reviews = await Review.find(filter);
   res.status('200').json({
      status: 'success',
      data: {
         results: reviews.length,
         reviews,
      },
   });
});

exports.setTourId = (req, res, next) => {
   if (!req.body.tour) req.body.tour = req.params.tourId;
   if (!req.body.user) req.body.user = req.user.id;
   next();
};
exports.createReview = createOne(Review);

exports.deleteReview = deleteOne(Review);
exports.updateReview = updateOne(Review);
