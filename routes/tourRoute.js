const express = require('express');
const {
   getMonthlyPlan,
   getTourStats,
   getTour,
   createTour,
   getAllTours,
   updateTour,
   deleteTour,
   aliasTopTours,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours).post(createTour);

router
   .route('/:id')
   .get(getTour)
   .patch(updateTour)
   .delete(protect, restrictTo('admin'), deleteTour);

module.exports = router;
