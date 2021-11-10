const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  series: {
    type: [Types.ObjectId],
    ref: "Serie",
  },
});

const User = model("User", userSchema, "Users");

module.exports = User;
