const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrors = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
   console.log('Hello from the middleware 👋');
   next();
});

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
   next(
      new AppError(
         `Can't find ${req.originalUrl} not found`,
         404
      )
   );
});

app.use(globalErrors);
module.exports = app;
