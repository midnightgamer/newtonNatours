const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');

const globalErrors = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const reviewRouter = require('./routes/reviewRoute');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

const limiter = rateLimit({
   max: 100,
   windowMs: 60 * 60 * 1000,
   message: 'Too many requests from this IP please try again later',
});
// Security HTTP HEADER
app.use(helmet());
// Limiting HTTP request
app.use('/api', limiter);
// Body parser rading data from data.req
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against xss
app.use(xss());
// Remove duplicate query strings
app.use(
   hpp({
      whitelist: [
         'duration',
         'ratingsQuantity',
         'ratingsAverage',
         'maxGroupSize',
         'difficulty',
         'price',
      ],
   })
);

app.use((req, res, next) => {
   console.log('Hello from the middleware 👋');
   next();
});

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} not found`, 404));
});

app.use(globalErrors);
module.exports = app;
