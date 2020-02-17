const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    type: "Feature",
    geometry: {
      type: "point",
      coordinates: [Number]
    },
    properties: {
      type: String,
      date: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("reports", schema);
