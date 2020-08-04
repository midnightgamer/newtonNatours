const multer = require('multer');
const sharp = require('sharp');
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

const multerStore = multer.memoryStorage();
const multerFilter = (req, file, callback) => {
   if (file.mimetype.startsWith('image')) {
      callback(null, true);
   } else {
      callback(new AppError('Not a valid image', 400), false);
   }
};
const upload = multer({
   storage: multerStore,
   fileFilter: multerFilter,
});

exports.resizeTourImages = catchAsync(async (req, res, next) => {
   if (!req.files.imageCover || !req.files.images) return next();
   // Cover image
   const imageCoverFileName = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
   await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${imageCoverFileName}`);
   req.body.imageCover = imageCoverFileName;

   // Images
   req.body.images = [];
   await Promise.all(
      req.files.images.map(async (file, index) => {
         const fileName = `tour-${req.params.id}-${Date.now()}-${
            index + 1
         }.jpeg`;
         await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/tours/${fileName}`);

         req.body.images.push(fileName);
      })
   );
   next();
});

exports.uploadTourImages = upload.fields([
   {
      name: 'imageCover',
      maxCount: 1,
   },
   {
      name: 'images',
      maxCount: 3,
   },
]);

exports.aliasTopTours = catchAsync((req, res, next) => {
   req.query.limit = '5';
   req.query.sort = '-ratingsAverage,price';
   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
   next();
});

exports.getAllTours = getAll(Tour);

exports.getTourBySlug = catchAsync(async (req, res, next) => {
   const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user',
   });
   if (!tour) {
      return next(new AppError('No Tour found with this name', 404));
   }
   res.status(200).json({
      status: 'success',
      data: {
         tour,
      },
   });
});

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
