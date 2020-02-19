const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    model: String,
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        required: false
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("bike", schema);
