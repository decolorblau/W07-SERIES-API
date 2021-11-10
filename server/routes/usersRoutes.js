const express = require("express");
const { validate } = require("express-validation");
const { createUser, loginUser } = require("../controllers/usersController");

const usersSchema = require("../schemas/userSchema");

const router = express.Router();

router.post("/users", validate(usersSchema), createUser);
router.post("/users", validate(usersSchema), loginUser);

module.exports = router;
