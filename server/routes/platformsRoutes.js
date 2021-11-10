const express = require("express");
const { validate } = require("express-validation");
const {
  getPlatforms,
  createPlatform,
  editPlatform,
} = require("../controllers/platformController");

const platformSchema = require("../schemas/platformSchema");

const router = express.Router();

router.get("/", getPlatforms);
router.post("/", validate(platformSchema), createPlatform);
router.put("/:id", validate(platformSchema), editPlatform);

module.exports = router;
