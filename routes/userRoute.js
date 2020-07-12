const express = require('express');
const {
   getAllUsers,
   updateUser,
   deleteUser,
   createUser,
   getUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').patch(updateUser).get(getUser).delete(deleteUser);

module.exports = router;
