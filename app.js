const express = require('express');
const userRouter = require('./routes/userRoute');
const tourRouter = require('./routes/tourRoute');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
const port = 3000;
app.listen(port, () => {
  console.log(
    `Server listening on http://localhost:${port}`
  );
});
