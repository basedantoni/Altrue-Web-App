const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// Input Validation
const validateRegisterInput = require('../../validation/register/register');
const validateLoginInput = require('../../validation/login/login');

// User Model
const User = require('../../models/User');
const Poc = require('../../models/Poc');

// @route POST api/users/registe
// @desc Register user
// @access Public
router.post('/register', (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists'});
    }
    else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req,res) => {
  // Form Validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by username
  User.findOne({ email }).then(user => {
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

// @route GET api/users
// @desc Get All users
// @access Public
router.get('/', (req, res) => {
  User.find()
    .sort({date: -1})
    .then(users => res.json(users));
});

// @route GET api/users
// @desc Get All POC
// @access Public
router.get('/poc', (req, res) => {
  Poc.find()
    .sort({date: -1})
    .then(pocs => res.json(pocs));
});

// @route POST api/users
// @desc Create A User
// @access Public
router.post('/', (req, res) => {
  console.log(req.body);
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2

  });

  newUser
    .save()
    .then(users => res.json(users))
    .catch(err => { res.status(400).json({ success: false })});
});

// @route DELETE api/users/:id
// @desc Delete A User
// @access Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;