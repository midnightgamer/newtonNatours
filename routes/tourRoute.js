const express = require('express');
const {
   deleteTour,
   updateTour,
   getAllTours,
   createTour,
   getTour,
   aliasTop5Cheap,
   getTourStats,
   getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

router
   .route('`11`wq /top-5-cheap`')
   .get(aliasTop5Cheap, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getAllTours).post(createTour);

router
   .route('/:id')
   .get(getTour)
   .delete(deleteTour)
   .patch(updateTour);

module.exports = router;
