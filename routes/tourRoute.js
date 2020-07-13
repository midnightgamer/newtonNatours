const express = require('express');
const {
   deleteTour,
   updateTour,
   getAllTours,
   createTour,
   getTour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);

router
   .route('/:id')
   .get(getTour)
   .delete(deleteTour)
   .patch(updateTour);

module.exports = router;
