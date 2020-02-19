const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    name: { first: String, last: String },
    password: String,
    bike: { model: String, location: [Number] },
    reports: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", schema);
