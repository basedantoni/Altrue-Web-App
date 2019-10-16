const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PocSchema = new Schema({

    username: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
});

module.exports = Poc = mongoose.model("poc", PocSchema);