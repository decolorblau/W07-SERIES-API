const express = require("express");
const { validate } = require("express-validation");
const usersSchema = require("../schemas/userSchema");
const { createUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", validate(usersSchema), createUser);

module.exports = router;
