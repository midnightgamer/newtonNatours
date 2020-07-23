const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../modals/tourModel');
const Reviews = require('../../modals/reviewModal');
const Users = require('../../modals/userModal');

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
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
   try {
      await Tour.create(tours);
      await Reviews.create(reviews);
      await Users.create(users, { validateBeforeSave: false });
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
      await Users.deleteMany();
      await Reviews.deleteMany();
      process.exit();
   } catch (e) {}
};

if (process.argv[2] === '--import') {
   importData();
}
if (process.argv[2] === '--delete') {
   deleteData();
}
