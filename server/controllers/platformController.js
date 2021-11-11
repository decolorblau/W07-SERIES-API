const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find();
    res.json(platforms);
  } catch (error) {
    next(error);
  }
};

const createPlatform = async (req, res, next) => {
  const { admin } = req.userData;
  try {
    if (!admin) {
      const error = new Error("You are not authorized to create a platform.");
      error.code = 401;
      next(error);
    } else {
      await Platform.create(req.body);
      res.status(201);
      res.json(req.body);
    }
  } catch (error) {
    next(error);
  }
};

const editPlatform = async (req, res, next) => {
  const { id } = req.params;
  const { admin } = req.userData;
  try {
    if (!admin) {
      const error = new Error("You are not authorized to edit a platform.");
      error.code = 401;
      next(error);
    } else {
      const platform = await Platform.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!platform) {
        const error = new Error("Platform not found.");
        error.code = 404;
        next(error);
      } else {
        res.status(200).json(platform);
      }
    }
  } catch (error) {
    next(error);
  }
};

const deletePlatform = async (req, res, next) => {
  const { id } = req.params;
  const { admin } = req.userData;
  try {
    if (!admin) {
      const error = new Error("You are not authorized to delete a platform.");
      error.code = 401;
      next(error);
    } else {
      const platform = await Platform.findByIdAndDelete(id);
      if (!platform) {
        const error = new Error("Platform not found.");
        error.code = 404;
        next(error);
      } else {
        res.status(200).json(platform);
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlatforms,
  editPlatform,
  createPlatform,
  deletePlatform,
};
