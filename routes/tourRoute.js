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
router
   .route('/monthly-plan/:year')
   .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
   .route('/')
   .get(getAllTours)
   .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
   .route('/:id')
   .get(getTour)
   .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
   .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
