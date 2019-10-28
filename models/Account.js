const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema ({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  accessToken: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  bankId: {
    type: String,
    required: true
  },
  bankName: {
    type: String
  },
  accountName: {
    type: String
  },
  accountType: {
    type: String
  },
  accountSubtype: {
    type: String
  }
})

module.exports = Account = mongoose.model("account", AccountSchema);