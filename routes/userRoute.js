const express = require('express');
const {
   getUser,
   createUser,
   deleteUser,
   updateUser,
   updateMe,
   getAllUsers,
   deleteMe,
   getMe,
} = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();
router.use(protect);
router.route('/').get(getAllUsers).post(createUser);

router.route('/me').get(getMe, getUser);
router.route('/updateMe').patch(updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
