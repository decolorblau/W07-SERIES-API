const express = require("express");
const { validate } = require("express-validation");

const usersSchema = require("../schemas/userSchema");
const router = express.Router();

router.post("/users", validate(usersSchema), createUser);

module.exports = router;
