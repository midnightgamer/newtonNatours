const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A user must have a name'],
   },
   email: {
      type: String,
      required: [true, 'A user must have e email'],
      unique: true,
      lowercase: true,
      validate: [
         validator.isEmail,
         'Please enter a valid email',
      ],
   },
   photo: {
      type: String,
   },
   password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [8, 'Password must contain 8 character'],
   },
   passwordConfirm: {
      type: String,
      required: [true, 'Please provide a confirm password'],
   },
});

const User = mongoose.model('users', userSchema);
module.exports = User;
