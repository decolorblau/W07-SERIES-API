const User = require("../../database/models/user");

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch {
    const error = new Error("Error creating the user");
    next(error);
  }
};

module.exports = { createUser };
