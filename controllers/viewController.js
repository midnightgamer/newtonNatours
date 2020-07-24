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

exports.getTour = (req, res) => {
   res.status(200).render('tour', {
      title: 'Tour',
   });
};
