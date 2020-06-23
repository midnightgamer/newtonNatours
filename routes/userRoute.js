const express = require('express');

const getAllUsers = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const getSingleUser = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const addUser = (req, res) => {
  // console.log(req.body);
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const updateUser = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const deleteUser = (req, res) => {
  res.json({
    status: 500,
    data: 'Not yet implemented',
  });
};

const route = express.Router();

route.route('/').get(getAllUsers).post(addUser);
route
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)
  .get(getSingleUser);

module.exports = route;
