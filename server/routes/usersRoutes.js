const express = require("express");

const router = express.Router();

router.post("/users", createUser);

module.exports = router;
