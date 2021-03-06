const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
   tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
   },
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
   },
   price: {
      type: Number,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   paid: {
      type: Boolean,
      default: true,
   },
});

bookingSchema.pre(/^find/, function (next) {
   this.populate('user').populate({
      path: 'tour',
      select: [
         'name',
         'imageCover',
         'ratingsAverage',
         'ratingsQuantity',
         'slug',
      ],
   });
   next();
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
