const express = require('express');
const { signup, login, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgetPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

module.exports = router;
