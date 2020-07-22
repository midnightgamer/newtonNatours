const mongoose = require('mongoose');

const rviewSchema = new mongoose.Schema(
   {
      review: {
         type: String,
         required: [true, 'Review can not be empty'],
      },
      rating: {
         type: Number,
         min: 1,
         max: 5,
      },
      createdAt: {
         type: Date,
         default: Date.now(),
      },
      tour: {
         type: mongoose.Schema.ObjectId,
         ref: 'Tour',
      },
      user: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
      },
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

const Review = mongoose.modal('Review', rviewSchema);

module.exports = Review;
