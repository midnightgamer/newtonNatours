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
const reviewRouter = require('./reviewRoute');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

// Calling reviewRouter if request url is /:tourId/reviews
router.use('/:tourId/reviews', reviewRouter);

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
