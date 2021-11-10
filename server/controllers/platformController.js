const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find({ user: req.userId });
  res.json(platforms);
};

const createPlatform = async (req, res, next) => {
  const { admin } = req.userData;
  if (!admin) {
    const error = new Error("You are not authorized to create a platform.");
    error.code = 401;
    next(error);
  } else {
    await Platform.create(req.body);
    res.status(201).json(req.body);
  }
};

const editPlatform = async (req, res, next) => {
  const { id } = req.params;
  const { admin } = req.userData;
  if (!admin) {
    const error = new Error("You are not authorized to edit a platform.");
    error.code = 401;
    next(error);
  } else {
    const platform = await Platform.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(!!platform);
    if (!platform) {
      console.log("NULLLL");
      const error = new Error("Platform not found.");
      error.code = 404;
      next(error);
    } else {
      res.status(200).json(platform);
    }
  }
};

module.exports = {
  getPlatforms,
  editPlatform,
  createPlatform,
};
