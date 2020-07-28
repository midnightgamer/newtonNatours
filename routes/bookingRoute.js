const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
   getCheckoutSession,
   createBooking,
   deleteBooking,
   getAllBooking,
   getBooking,
   updateBooking,
} = require('../controllers/bookingController');

const router = express.Router();
router.use(protect);
router.get('/checkout-session/:tourID', getCheckoutSession);
router.use(restrictTo('admin', 'lead-guide'));
router.route('/').get(getAllBooking).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);
module.exports = router;
