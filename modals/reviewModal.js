const mongoose = require('mongoose');
const Tour = require('./tourModel');

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

reviewSchema.statics.calcAverageRating = async function (tourId) {
   const stats = await this.aggregate([
      { $match: { tour: tourId } },
      {
         $group: {
            _id: 'tour',
            nRating: { $sum: 1 },
            averageRating: { $avg: '$rating' },
         },
      },
   ]);
   await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].averageRating,
   });
};

reviewSchema.pre(/^find/, function () {
   /* this.populate({
      path: 'tour',
      select: 'name',
   }).populate({
      path: 'user',
      select: 'name photo',
   }); */

   this.populate({
      path: 'user',
      select: 'name photo',
   });
});

reviewSchema.post('save', function () {
   this.constructor.calcAverageRating(this.tour);
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
