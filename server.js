const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
   '<password>',
   process.env.DBPASSWORD
);
mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.info('DB Connected');
   });

const tourSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   rating: { type: Number, default: 4.5 },
   price: { type: Number, required: true },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
   name: 'Forest Hiker',
   rating: 4,
   price: 497,
});

testTour.save().then((doc) => console.log(doc));

const port = process.env.PORT;
app.listen(port, () => {
   console.log(
      `Server listening on http://localhost:${port}`
   );
});
