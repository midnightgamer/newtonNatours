const Tour = require('../modals/tourModel');
const catchAsymc = require('../utils/catchAsync');

exports.getOverview = catchAsymc(async (req, res, next) => {
   // 1 Get tour data from collection
   const tours = await Tour.find();
   // 2 Build template
   // 3 Render template
   res.status(200).render('overview', {
      tours,
   });
});

exports.getTour = catchAsymc(async (req, res, next) => {
   const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user',
   });
   console.log(tour);
   res.status(200).render('tour', {
      tour,
   });
});