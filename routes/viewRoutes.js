const express = require('express');
const {
   getTour,
   getOverview,
   getLogin,
} = require('../controllers/viewController');

const { isLoggedIn } = require('../controllers/authController.js');

const router = express.Router();
router.use(isLoggedIn);
router.get('/', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLogin);

module.exports = router;
