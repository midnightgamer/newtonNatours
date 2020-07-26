const express = require('express');
const multer = require('multer');
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
} = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();
const upload = multer({dest:'public/img/users'})
router.use(protect);
router.route('/updateMe').patch( upload.single('photo'),updateMe);
router.route('/deleteMe').delete(deleteMe);
router.route('/me').get(getMe, getUser);

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
