const mongoose = require("mongoose");

const idSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  counter: { type: Number, default: 0 }
});

const ID = mongoose.model("ID", idSchema);

module.exports = ID;
