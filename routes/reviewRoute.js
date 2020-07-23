const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
   getAllReviews,
   createReview,
   deleteReview,
   updateReview,
   getReview,
   setTourId,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });
router
   .route('/')
   .get(protect, getAllReviews)
   .post(protect, restrictTo('user'), setTourId, createReview);

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
