const debug = require("debug")("seriesco:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (connectionDB) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", false);

    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.connect(connectionDB, (error) => {
      if (error) {
        debug(
          chalk.redBright("The database could not be started", error.message)
        );
        debug(chalk.red(error.message));

        reject();
        return;
      }
      debug(chalk.green("The database is connected"));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.green("DB disconnected"));
    });
  });

module.exports = connectDB;
