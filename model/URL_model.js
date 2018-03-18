const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url: String,
  hash: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
