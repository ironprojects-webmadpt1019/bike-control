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

module.exports = mongoose.model("bike", schema);
