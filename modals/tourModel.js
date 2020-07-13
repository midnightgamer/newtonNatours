const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   duration: {
      type: Number,
      required: [true, 'A Tour must have duration'],
   },
   maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have group size'],
   },
   difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
   },
   ratingsAverage: {
      type: Number,
      default: 4.5,
   },
   ratingsQuantity: {
      type: Number,
      default: 0,
   },
   price: {
      type: Number,
      required: true,
   },
   discount: {
      type: Number,
   },
   summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
   },
   description: {
      type: String,
      trim: true,
   },
   imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
   },
   images: [String],
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
