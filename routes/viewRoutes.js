const express = require('express');
const {
   getTour,
   getOverview,
   getLogin,
} = require('../controllers/viewController');

const router = express.Router();

router.get('/', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLogin);

module.exports = router;
