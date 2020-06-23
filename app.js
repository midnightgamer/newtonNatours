const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  res.json({
    status: 200,
    results: tours.length,
    data: { tours },
  });
};

const getSingleTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }

  res.json({
    status: 200,
    data: { tour },
  });
};

const addTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;

  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: '200',
        data: {
          tours: newTours,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }

  res.json({
    status: 200,
    data: { tour: '<Updated tour.....>' },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }

  res.json({
    status: 204,
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const getSingleUser = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const addUser = (req, res) => {
  // console.log(req.body);
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const updateUser = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const deleteUser = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

app.route('/api/v1/tours').get(getAllTours).post(addTour);
app
  .route('/api/v1/tours/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getSingleTour);

app.route('/api/v1/users').get(getAllUsers).post(addUser);
app
  .route('/api/v1/users/:id')
  .patch(updateUser)
  .delete(deleteUser)
  .get(getSingleUser);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
