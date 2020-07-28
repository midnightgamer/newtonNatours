const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
   console.error(err.name, err.message, err.stack);
   console.error('Unhandled exception , Shutting down server');
});

dotenv.config({
   path: './config.env',
});
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DBPASSWORD);

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
   .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
   console.info(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
   console.error(err.name, err.message);
   console.error('Unhandled rejection , Shutting down server');
   server.close(() => {
      process.exit(1);
   });
});

process.on('SIGTERM', () => {
   console.log('SIGTERM received, Shutting Down');
   server.close(() => {
      console.log('Process terminated ');
   });
});
