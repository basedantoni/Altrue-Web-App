const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const plaid = require('./routes/api/plaid');
const manager = require('./routes/api/manager');
const eventbrite = require('./routes/api/eventbrite');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// Passport Middelware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const {
  receivePublicToken,
  getTransactions
  } = require("./controllers/controller");

// Use Routes
app.use('/api/users', users);
app.use('/api/manager', manager);
app.use('/api/plaid', plaid);

// Get the public token and exchange it for an access token
app.post("/auth/public_token", receivePublicToken);
// Get Transactions
app.get("/transactions", getTransactions);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set a static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));