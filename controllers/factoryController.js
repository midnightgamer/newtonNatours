const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
      const newDoc = await Model.create(req.body);
      res.status(201).json({
         status: 'success',
         data: {
            data: newDoc,
         },
      });
   });
};
