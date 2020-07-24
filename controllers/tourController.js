const Tour = require('../modals/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
   deleteOne,
   updateOne,
   createOne,
   getOne,
   getAll,
} = require('./factoryController');

exports.aliasTopTours = catchAsync((req, res, next) => {
   req.query.limit = '5';
   req.query.sort = '-ratingsAverage,price';
   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
   next();
});

exports.getAllTours = getAll(Tour);

exports.getTour = getOne(Tour, { path: 'reviews' });
exports.createTour = createOne(Tour);
exports.updateTour = updateOne(Tour);
exports.deleteTour = deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res) => {
   const stats = await Tour.aggregate([
      {
         $match: {
            ratingsAverage: {
               $gte: 4.5,
            },
         },
      },
      {
         $group: {
            _id: {
               $toUpper: '$difficulty',
            },
            numTours: {
               $sum: 1,
            },
            numRatings: {
               $sum: '$ratingsQuantity',
            },
            avgRating: {
               $avg: '$ratingsAverage',
            },
            avgPrice: {
               $avg: '$price',
            },
            minPrice: {
               $min: '$price',
            },
            maxPrice: {
               $max: '$price',
            },
         },
      },
      {
         $sort: {
            avgPrice: 1,
         },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
   ]);

   res.status(200).json({
      status: 'success',
      data: {
         stats,
      },
   });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
   const year = req.params.year * 1; // 2021

   const plan = await Tour.aggregate([
      {
         $unwind: '$startDates',
      },
      {
         $match: {
            startDates: {
               $gte: new Date(`${year}-01-01`),
               $lte: new Date(`${year}-12-31`),
            },
         },
      },
      {
         $group: {
            _id: {
               $month: '$startDates',
            },
            numTourStarts: {
               $sum: 1,
            },
            tours: {
               $push: '$name',
            },
         },
      },
      {
         $addFields: {
            month: '$_id',
         },
      },
      {
         $project: {
            _id: 0,
         },
      },
      {
         $sort: {
            numTourStarts: -1,
         },
      },
      {
         $limit: 12,
      },
   ]);

   res.status(200).json({
      status: 'success',
      data: {
         plan,
      },
   });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
   const { distance, latlng, unit } = req.params;
   const [lat, lng] = latlng.split(',');
   // Converting distance in radiance unit
   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
   if (!lat || !lng) {
      next(new AppError('Please provide valid location', 400));
   }
   console.log(lat, lng, radius);
   const tours = await Tour.find({
      startLocation: { $geoWithin: { $centerSphere: [[lat, lng], radius] } },
   });
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
         data: tours,
      },
   });
});

exports.getDistance = catchAsync(async (req, res, next) => {
   const { latlng, unit } = req.params;
   const [lat, lng] = latlng.split(',');
   const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
   if (!lat || !lng) {
      next(new AppError('Please provide valid location', 400));
   }
   const distances = await Tour.aggregate([
      {
         $geoNear: {
            near: {
               type: 'Point',
               coordinates: [lat * 1, lng * 1],
            },
            distanceField: 'distance',
            distanceMultiplier: multiplier,
         },
      },
      {
         $project: {
            distance: 1,
            name: 1,
         },
      },
   ]);
   res.status(200).json({
      status: 'success',
      data: {
         data: distances,
      },
   });
});
