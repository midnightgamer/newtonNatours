const express = require('express');
const {checkBody,deleteTour,updateTour,getAllTours,checkID,createTour,getTour} = require('./../controllers/tourController');

const router = express.Router();

router.param('id', checkID);

router
    .route('/')
    .get(getAllTours)
    .post(checkBody, createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;
