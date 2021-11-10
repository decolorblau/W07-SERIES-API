const express = require("express");
const { validate } = require("express-validation");
const Platform = require("../../database/models/platform");
const { getPlatforms } = require("../controllers/platformController");

const platformSchema = require("../schemas/platformSchema");

const router = express.Router();

router.get("/", getPlatforms);

module.exports = router;
