const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find({ user: req.userId });
  res.json(platforms);
};

module.exports = {
  getPlatforms,
};
