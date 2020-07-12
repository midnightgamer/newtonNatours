const express = require('express');
const {getAllTours , addTour , deleteTour , getSingleTour , updateTour} = require( "../controllers/tourController");

const route = express.Router();

route.route('/').get(getAllTours).post(addTour);
route
  .route('/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getSingleTour);

module.exports = route;
