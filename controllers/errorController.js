const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
   const message = `Invalid ${err.path} : ${err.value}`;
   return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
   const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
   const message = `Duplicate ${value} please use another value`;
   return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
   const errors = Object.values(err.errors).map((el) => el.message);
   const message = `Invalid data ${errors.join('. ')}`;
   return new AppError(message, 400);
};

const handleJsonWebTokenError = () => {
   return new AppError('Invalid token , Please login again', 401);
};
const handleTokenExpiredError = () => {
   return new AppError('Token expired , Please login again', 401);
};

const sendDevError = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

const sendProductionError = (err, res) => {
   if (err.isOperatinal) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      res.status(500).json({
         status: 500,
         message: 'Something went wrong',
      });
   }
};

//Global Error handler
module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (process.env.NODE_ENV === 'production') {
      let error = { ...err };
      if (err.name === 'CastError') error = handleCastErrorDB(err);
      if (err.code === 11000) error = handleDuplicateErrorDB(err);
      if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
      if (err.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
      if (err.name === 'TokenExpiredError') error = handleTokenExpiredError();
      sendProductionError(error, res);
   } else if (process.env.NODE_ENV === 'development') {
      sendDevError(err, res);
   }
};
