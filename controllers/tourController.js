const Tour = require('../modals/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTop5Cheap = (req, res, next) => {
   req.query.limit = '5';
   req.query.sort = '-ratingsAverage,price';
   req.query.fields =
      'name,price,ratingsAverage,summary,difficulty';
   next();
};

exports.getAllTours = async (req, res) => {
   try {
      //Execute query
      const features = new APIFeatures(
         Tour.find(),
         req.query
      )
         .filter()
         .sort()
         .limitFields()
         .paginate();
      const tours = await features.query;

      res.status(200).json({
         status: 'success',
         results: tours.length,
         data: {
            tours,
         },
      });
   } catch (e) {
      res.status(404).json({
         status: 404,
         message: e,
      });
   }
};

exports.getTour = async (req, res) => {
   try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
         status: 'success',
         data: {
            tour,
         },
      });
   } catch (e) {
      res.status(404).json({
         status: 'fail',
         message: e,
      });
   }
};

exports.createTour = async (req, res) => {
   try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
         status: 'success',
         data: {
            tour: newTour,
         },
      });
   } catch (e) {
      res.status(400).json({
         status: 'fail',
         message: e,
      });
   }
};

exports.updateTour = async (req, res) => {
   try {
      const tour = await Tour.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );
      res.status(200).json({
         status: 'success',
         data: {
            tour: tour,
         },
      });
   } catch (e) {
      res.status(400).json({
         status: 'fail',
         message: e,
      });
   }
};

exports.deleteTour = async (req, res) => {
   await Tour.findByIdAndDelete(req.params.id);
   try {
      res.status(204).json({
         status: 'success',
         data: null,
      });
   } catch (e) {
      res.status(400).json({
         status: 'fail',
         message: e,
      });
   }
};
