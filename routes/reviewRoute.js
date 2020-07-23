const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
   getAllReviews,
   createReview,
   deleteReview,
   updateReview,
   setTourId,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });
router
   .route('/')
   .get(protect, getAllReviews)
   .post(protect, restrictTo('user'), setTourId, createReview);

router.route('/:id').patch(updateReview).delete(deleteReview);

module.exports = router;
