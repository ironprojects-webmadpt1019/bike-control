const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        required: false
      }
    },
    properties: {
      incident: { type: String, default: "Theft" }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
        return ret;
      }
    }
  }
);

const schhemaWithIndex = schema.index({ location: "2dsphere" });

module.exports = mongoose.model("reports", schhemaWithIndex);
