const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
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

reviewSchema.pre(/^find/, function () {
   this.populate({
      path: 'tour',
      select: 'name',
   }).populate({
      path: 'user',
      select: 'name photo',
   });
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
