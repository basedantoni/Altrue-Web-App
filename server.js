const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users")

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Use routes
app.use('api/users', users);

const port = process.env.PORT || 5000; // process.env.port will be DO

app.listen(port, () => console.log(`Server up and running on port ${port} !`));