const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../database/models/user");

const createUser = async (req, res, next) => {
  const { username, password, admin } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
      admin,
    });
    res.status(201).json(newUser);
  } catch {
    const error = new Error("Error creating the user");
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("Wrong credentials");
      error.code = 500;
      next(error);
    } else {
      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        const error = new Error("Wrong credentials");
        error.code = 401;
        next(error);
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            admin: user.admin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 24 * 60 * 60,
          }
        );
        res.json({ token });
      }
    }
  } catch {
    const error = new Error("Error logging in the user");
    next(error);
  }
};

module.exports = { createUser, loginUser };
