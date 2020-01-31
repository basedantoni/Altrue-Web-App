const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  location: {
    type: String
  },
  organization: {
    type: String
  }
})

module.exports = Event = mongoose.model("event", EventSchema);