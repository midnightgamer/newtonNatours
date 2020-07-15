const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true,
      },
      slug: {
         type: String,
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
         select: false,
      },
      startDates: [Date],
   },
   {
      toJSON: {
         virtuals: true,
      },
      toObject: {
         virtuals: true,
      },
   }
);

//DOCUMENT MIDDLEWARE: pre runs before .save and .create
tourSchema.pre('save', function (next) {
   this.slug = slugify(this.name, {
      lower: true,
   });
   next();
});
//DOCUMENT MIDDLEWARE: post runs after .save and .create
/*tourSchema.post('save', function (doc, next) {
   console.log(doc);
   next();
});*/
//Virtual Properties
tourSchema.virtual('durationWeek').get(function () {
   return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
