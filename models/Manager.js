const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
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
  orgId: {
    type: Number,
    required: true
  },
  orgName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  event: {
    name: String,
    location: String,
    date: Date,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Manager = mongoose.model('manager', ManagerSchema);