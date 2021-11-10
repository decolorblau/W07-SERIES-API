const express = require("express");
const { validate } = require("express-validation");
const { createUser, loginUser } = require("../controllers/usersController");

const usersSchema = require("../schemas/userSchema");

const router = express.Router();

router.post("/login", validate(usersSchema), loginUser);
router.post("/register", validate(usersSchema), createUser);

module.exports = router;
