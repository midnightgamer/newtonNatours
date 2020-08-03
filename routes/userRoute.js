const express = require('express');
const { restrictTo } = require('../controllers/authController');
const {
   getUser,
   createUser,
   deleteUser,
   updateUser,
   updateMe,
   getAllUsers,
   deleteMe,
   getMe,
   uploadUserPhoto,
   resizeUserPhoto,
} = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();
router.use(protect);
router.route('/updateMe').patch(uploadUserPhoto, resizeUserPhoto, updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/me').get(getMe, getUser);

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
