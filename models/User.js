const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  totalDonations: {
    type: String,
    default: 0
  },
  volunteerHours: {
    type: String,
    default: 0
  },
  eventsAttendance: {
    type: String,
    default: 0
  },
  contributionRank: {
    type: String,
    default: 0
  }
});

module.exports = User = mongoose.model("user", UserSchema);