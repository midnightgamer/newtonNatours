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
   if (stats.length > 0) {
      await Tour.findByIdAndUpdate(tourId, {
         ratingsQuantity: stats[0].nRating,
         ratingsAverage: stats[0].averageRating,
      });
   } else {
      await Tour.findByIdAndUpdate(tourId, {
         ratingsQuantity: 0,
         ratingsAverage: 4.5,
      });
   }
};
// TODO: Check this implementation after a day, it should not allow user to post multiple comment
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

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

reviewSchema.pre(/findOneAnd/, async function (next) {
   // Can not access this.constructor in post middleware so here we string current modal to this.r  so we can use in
   // post middleware
   this.r = await this.findOne();
   next();
});
reviewSchema.post(/findOneAnd/, async function () {
   await this.r.constructor.calcAverageRating(this.r.tour);
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
