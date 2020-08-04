const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
   getCheckoutSession,
   createBooking,
   deleteBooking,
   getAllBooking,
   getBooking,
   updateBooking,
   getUserAllBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.use(protect);
router.get('/checkout-session/:tourID', getCheckoutSession);
router.get('/my-bookings/:id', getUserAllBooking);

router.use(restrictTo('admin', 'lead-guide'));
router.route('/').get(getAllBooking).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);
module.exports = router;
