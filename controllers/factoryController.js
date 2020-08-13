const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) => {
   return catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
         return next(new AppError('No document found', 404));
      }
      res.status(204).json({
         status: 'success',
         data: null,
      });
   });
};

exports.updateOne = (Model) => {
   return catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      if (!doc) {
         return next(new AppError('No document found', 404));
      }
      res.status(200).json({
         status: 'success',
         data: {
            data: doc,
         },
      });
   });
};

exports.createOne = (Model) => {
   return catchAsync(async (req, res) => {
      // const newTour = new Tour({})
      // newTour.save()
      console.log(req.body.guides);
      const newDoc = await Model.create(req.body);

      res.status(201).json({
         status: 'success',
         data: {
            data: newDoc,
         },
      });
   });
};

exports.getOne = (Model, populateOptions) => {
   return catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (populateOptions) query = query.populate(populateOptions);
      const doc = await query;
      if (!doc) {
         return next(new AppError('No document found', 404));
      }
      res.status(200).json({
         status: 'success',
         data: {
            data: doc,
         },
      });
   });
};

exports.getAll = (Model) =>
   catchAsync(async (req, res, next) => {
      // To allow nested GET reviews on tours
      let filter = {};
      if (req.params.tourId) filter = { tour: req.params.tourId };
      // EXECUTE QUERY
      const features = new APIFeatures(Model.find(), req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate();
      const doc = await features.query;

      // SEND RESPONSE
      res.status(200).json({
         status: 'success',
         results: doc.length,
         data: {
            data: doc,
         },
      });
   });
