const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// Input Validation
const validateRegisterInput = require('../../validation/register/register');
const validateLoginInput = require('../../validation/login/login');

// User Model
const Admin = require('../../models/Admin');

// @route POST api/admin/register
// @desc Register admin
// @access Public
router.post('/register', (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      return res.status(400).json({ email: 'Email already exists'});
    }
    else {
      const newAdmin = new Admin({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      // Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
        newAdmin.password = hash;
        newAdmin
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/admin/login
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
  Admin.findOne({ email }).then(admin => {
    // Checks if user exists
    if (!admin) {
      return res.status(400).json({ emailnotfound: 'Email not found'});
    }

    // Checks Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // User method
        // Creat JWT Payload
        const payload = {
          id: admin.id,
          name: admin.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 1 day in seconds
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

// @route GET api/admins
// @desc Get All admins
// @access Public
router.get('/', (req, res) => {
  Admin.find()
    .sort({date: -1})
    .then(admins => res.json(admins));
});

// @route POST api/users
// @desc Create An Admin
// @access Public
router.post('/', (req, res) => {
  console.log(req.body);
  const newAdmin = new Admin({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2

  });

  newAdmin
    .save()
    .then(admins => res.json(admins))
    .catch(err => { res.status(400).json({ success: false })});
});

// @route DELETE api/users/:id
// @desc Delete An Admin
// @access Public
router.delete('/:id', (req, res) => {
  Admin.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route UPDATE api/admin/:id
// @desc Update a User's donation amount
// @access Public
router.post('/:id', (req,res) => {
  Admin.findById(req.params.id)
    .then()
})

module.exports = router;