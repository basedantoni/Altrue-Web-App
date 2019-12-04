const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// Input Validation
const validateRegisterInput = require('../../validation/register/manager-register');
const validateLoginInput = require('../../validation/login/manager-login');

// Manager Model
const Manager = require('../../models/Manager');

// @route POST api/managers/register
// @desc Register Orginization Manager
// @access Public
router.post('/register/manager-register', (req, res) => {
  
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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login/manager-login', (req,res) => {
  // Form Validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by username
  Manager.findOne({ email }).then(user => {
    // Checks if user exists
    if (!user) {
      return res.status(400).json({ emailnotfound: 'Email not found'});
    }

    // Checks Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User method
        // Creat JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
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
// @desc Get All managers
// @access Public
router.get('/', (req, res) => {
  Manager.find()
    .sort({date: -1})
    .then(manager => res.json(manager));
});


// @route POST api/manager
// @desc Create A User
// @access Public
router.post('/', (req, res) => {
  console.log(req.body);
  const newManager = new Manager({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2

  });

  newManager
    .save()
    .then(manager => res.json(manager))
    .catch(err => { res.status(400).json({ success: false })});
});

// @route DELETE api/manager/:id
// @desc Delete A Manager
// @access Public
router.delete('/:id', (req, res) => {
  Manager.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;