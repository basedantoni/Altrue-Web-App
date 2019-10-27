const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// Input Validation
const validateRegisterInput = require('../../validation/register/manager-register');
const validateLoginInput = require('../../validation/login/login');

// Manager Model
const Manager = require('../../models/Manager');

// @route POST api/managers/register
// @desc Register Orginization Manager
// @access Public
router.post('/register', (req, res) => {
  
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Manager.findOne({ email: req.body.email }).then(manager => {
    if (manager) {
      return res.status(400).json({ email: 'Email already exists'});
    }
    else {
      const newManager = new Manager({
        name: req.body.name,
        username: req.body.username,
        ordId: req.body.org_id,
        orgName: req.body.org_name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newManager.password, salt, (err, hash) => {
          if (err) throw err;
        newManager.password = hash;
        newManager
          .save()
          .then(manager => res.json(manager))
          .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;