const Tour = require('../modals/tourModel');

exports.getAllTours = async (req, res) => {
   try {
      const queryObj = {
         ...req.query,
      };
      //Basic Filtering
      const excludeFields = [
         'page',
         'sort',
         'limit',
         'fields',
      ];
      excludeFields.forEach((el) => delete queryObj[el]);

      //Advance Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
         /\b(gte|gt|lt|lte)\b/g,
         (match) => `$${match}`
      );
      let query = Tour.find(JSON.parse(queryStr));

      //Sorting
      if (req.query.sort) {
         const sortBy = req.query.sort.split(',').join(' ');
         query = query.sort(sortBy);
      } else {
         query = query.sort('-createdAt');
      }

      //Field Limiting
      if (req.query.fields) {
         const sortBy = req.query.fields
            .split(',')
            .join(' ');
         query = query.select(sortBy);
      } else {
         query = query.select('-__v');
      }
      const tours = await query;
      res.status(200).json({
         status: 'success',
         results: tours.length,
         data: {
            tours,
         },
      });
   } catch (e) {
      res.status(400).json({
         status: 400,
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
