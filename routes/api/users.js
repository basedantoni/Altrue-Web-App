const express = require('express');
const router = express.router();

// User Model
const User = require('../../models/Users');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', (req, res) => {
  User.find()
    .sort({date: -1})
    .then(users => res.json(users))
});

module.exports = router;