const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
      validate: [validator.isEmail, 'Please enter a valid email'],
   },
   photo: {
      type: String,
   },
   password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [8, 'Password must contain 8 character'],
      select: false,
   },
   passwordConfirm: {
      type: String,
      required: [true, 'Please provide a confirm password'],
      validate: {
         validator: function (el) {
            return el === this.password;
         },
         //Works only and save
         message: 'Password and Confirm password should be same',
      },
   },
   passwordChangeAt: {
      type: Date,
      required: [true, 'Please provide a'],
   },
});

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 12);
   this.passwordConfirm = undefined;
   next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
   return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPassword = function (JWTTimestamp) {
   if (this.passwordChangeAt) {
      const changeTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
      return JWTTimestamp < changeTimestamp;
   }
   //False means not change
   return false;
};

const User = mongoose.model('users', userSchema);
module.exports = User;
