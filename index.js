require("dotenv").config();

const { initializeServer } = require("./server/index");
const connectDB = require("./database/index");

const PORT = process.env.PORT ?? 5000;

(async () => {
  try {
    await connectDB(process.env.DB_STRING);
    await initializeServer(PORT);
  } catch (error) {
    process.exit(1);
  }
})();
