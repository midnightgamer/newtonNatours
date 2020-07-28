const express = require('express');
const {
   getTour,
   getOverview,
   getLogin,
   updateUserData,
   getMyTours,
   getAccount,
} = require('../controllers/viewController');
// const {  } = require('../controllers/bookingController');

const { isLoggedIn, protect } = require('../controllers/authController.js');

const router = express.Router();
router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLogin);
router.get('/me', protect, getAccount);
router.patch('/me', protect, updateUserData);
router.get('/my-tours', protect, getMyTours);

module.exports = router;
