const { Schema, model, Types } = require("mongoose");

const seriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: Types.ObjectId,
    ref: "Platform",
  },
});

const Serie = model("Serie", seriesSchema, "Series");

module.exports = Serie;
