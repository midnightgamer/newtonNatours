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
   getDistance,
   getToursWithin,
   resizeTourImages,
   getTourBySlug,
   uploadTourImages,
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

router.get('/:slug', getTourBySlug);
router
   .route('/:id')
   .get(getTour)
   .patch(
      protect,
      restrictTo('admin', 'lead-guide'),
      uploadTourImages,
      resizeTourImages,
      updateTour
   )
   .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);
router
   .route('/toursWithin/distance/:distance/center/:latlng/unit/:unit')
   .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistance);
module.exports = router;
