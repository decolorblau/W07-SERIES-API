const { Schema, model } = require("mongoose");

const platformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Platform = model("Platform", platformSchema, "Platforms");

platformSchema.set("toJSON", {
  virtuals: false,
});

module.exports = Platform;
