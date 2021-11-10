const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const debug = require("debug")("series:server");

const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRoutes);
