const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  accessToken: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  eventName: {
    type: String
  }
})

module.exports = Event = mongoose.model("event", EventSchema);