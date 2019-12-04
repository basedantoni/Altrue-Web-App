const express = require('express');
const plaid = require('plaid');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');

// Load Account and User Models
const Account = require('../../models/Account');
const User = require('../../models/User');

const PLAID_CLIENT_ID = '5d684cdc8fd6470012c1d3be';
const PLAID_SECRET = '5eb9a4bc21e77f85b48b1283742dd8';
const PLAID_PUBLIC_KEY = '149919998b1615c24386e3ad303fbc';

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: '2019-05-29' }
)

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

// Routes
//@route POST api/plaid/accounts/add
//@desc Trades public token for access token and stores creds into database
//@access Private
router.post(
  '/accounts/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    PUBLIC_TOKEN = req.body.public_token;

    const userId = req.user.id;

    const bank = req.body.metadata.institution;
    const { name, institution_id } = bank;

    if(PUBLIC_TOKEN) {
      client
        .exchangePublicToken(PUBLIC_TOKEN)
        .then(exchangeResponse => {
          ACCESS_TOKEN = exchangeResponse.access_token;
          ITEM_ID = exchangeResponse.item_id;

          // Check if account already exists
          Account.findOne({
            userId: req.user.id,
            bankId: institution_id
          })
            .then(account => {
              if(account) {
                console.log('Account already exists');
              } 
              else {
                const newAccount = new Account({
                  userId: userId,
                  accessToken: ACCESS_TOKEN,
                  itemId: ITEM_ID,
                  bankId: institution_id,
                  bankName: name
                });
          newAccount.save().then(account => res.json(account));
              }
            })
            .catch(err => console.log('Mongo Error: ' + err));
        })
        .catch(err => console.log('Plaid Error: ' + err));
    }
  }
);

// @route DELETE api/plaid/accounts/:id
// @desc Delete account with given id
// @access Private
router.delete(
  "/accounts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then(account => {
      // Delete account
      account.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.find({ userId: req.user.id })
      .then(accounts => res.json(accounts))
      .catch(err => console.log(err));
  }
);

// @route POST api/plaid/accounts/transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.post(
  "/accounts/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); // Change this if you want more transactions
  let transactions = [];
  const accounts = req.body;
  if (accounts) {
      accounts.forEach(function(account) {
        ACCESS_TOKEN = account.accessToken;
        const bankName = account.bankName;
        client
          .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
          .then(response => {
            transactions.push({
              accountName: bankName,
              transactions: response.transactions
            });
            // Don't send back response till all transactions have been added
            if (transactions.length === accounts.length) {
              res.json(transactions);
            }
          })
          .catch(err => console.log(err));
      });
    }
  }
);

// @route POST api/plaid/accounts/all-transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.post(
  "/accounts/all-transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const oneYearAgo = now.subtract(365, "days").format("YYYY-MM-DD"); // Change this if you want more transactions
  let transactions = [];
  const accounts = req.body;
  if (accounts) {
      accounts.forEach(function(account) {
        ACCESS_TOKEN = account.accessToken;
        const bankName = account.bankName;
        client
          .getTransactions(ACCESS_TOKEN, oneYearAgo, today)
          .then(response => {
            transactions.push({
              accountName: bankName,
              transactions: response.transactions
            });
            // Don't send back response till all transactions have been added
            if (transactions.length === accounts.length) {
              res.json(transactions);
              console.log(res);
            }
          })
          .catch(err => console.log(err));
      });
    }
  }
);

module.exports = router;