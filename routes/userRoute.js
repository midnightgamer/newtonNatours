const express = require('express');
const {
   getUser,
   createUser,
   deleteUser,
   updateUser,
   updateMe,
   getAllUsers,
} = require('../controllers/userController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/updateMe').patch(protect, updateMe);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
