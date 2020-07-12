const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const tourRouter = require('./routes/tourRoute');

const app = express();
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
