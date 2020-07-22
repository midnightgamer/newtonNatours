const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../modals/tourModel');

dotenv.config({
   path: './config.env',
});

const DB = process.env.DATABASE.replace('<password>', process.env.DBPASSWORD);
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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
console.log(tours);
const importData = async () => {
   try {
      await Tour.create(tours);
      console.log('Data added');
      process.exit();
   } catch (e) {
      console.log(e);
      process.exit();
   }
};

const deleteData = async () => {
   try {
      await Tour.deleteMany();
      process.exit();
   } catch (e) {}
};

if (process.argv[2] === '--import') {
   importData();
}
if (process.argv[2] === '--delete') {
   deleteData();
}
