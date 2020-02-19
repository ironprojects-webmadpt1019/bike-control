const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    model: String,
    owner: String,
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: false
      },
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
