const admin = require("firebase-admin");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { validate } = require("express-validation");
const {
  getPlatforms,
  createPlatform,
  editPlatform,
  deletePlatform,
} = require("../controllers/platformController");

const platformSchema = require("../schemas/platformSchema");

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "series-5c091.appspot.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      console.log("HI");
      console.log(req.file);
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);
      const oldFilenameWithoutExtension = oldFilename.replace(
        oldFilenameExtension,
        ""
      );

      const newFilename = `${oldFilenameWithoutExtension}-${Date.now()}${oldFilenameExtension}`;

      callback(null, newFilename);
    },
  }),
});

router.get("/", getPlatforms);
router.post(
  "/",
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.file);
    const bucket = admin.storage().bucket();
    await bucket.upload(req.file.path);
    await bucket.file(req.file.filename).makePublic();
    const fileURL = bucket.file(req.file.filename).publicUrl();
    console.log(fileURL);
    next();
  },
  createPlatform
);
router.put("/:id", validate(platformSchema), editPlatform);
router.delete("/:id", deletePlatform);

module.exports = router;
