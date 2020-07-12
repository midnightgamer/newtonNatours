const express = require('express');
const {getAllUsers,addUser,deleteUser,getSingleUser,updateUser} = require('../controllers/userController')
const route = express.Router();

route.route('/').get(getAllUsers).post(addUser);
route
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)
  .get(getSingleUser);

module.exports = route;

