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

// @route POST api/manager/register
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
        email: req.body.email,
        orgId: parseInt(req.body.orgId, 10),
        orgName: req.body.orgName,
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

// @route POST api/manager/login
// @desc Login manager and return JWT token
// @access Public
router.post('/login', (req,res) => {
  // Form Validation
  const { errors, isValid } = validateLoginInput(req.body);
  const email = req.body.email;
  const password = req.body.password;

  // Find user by username
  Manager.findOne({ email }).then(manager => {
    // Checks if user exists
    if (!manager) {
      return res.status(400).json({ emailnotfound: 'Email not found'});
    }

    // Checks Password
    bcrypt.compare(password, manager.password).then(isMatch => {
      if (isMatch) {
        // User method
        // Creat JWT Payload
        const payload = {
          id: manager.id,
          name: manager.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      }
      else {
        return res
          .status(400)
          .json({ passwordinccorect: 'Password incorrect' });
      }
    });
  });
});

// @route GET api/manager
// @desc Get All manager
// @access Public
router.get('/', (req, res) => {
  Manager.find()
    .sort({date: -1})
    .then(managers => res.json(managers));
});

// @route DELETE api/manager/:id
// @desc Delete A User
// @access Public
router.delete('/:id', (req, res) => {
  Manager.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;