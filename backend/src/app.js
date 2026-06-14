const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const env = require("./config/env");

const app = express();
const testRoutes = require("./routes/test.route");

app.use("/api/test", testRoutes);

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Marvel Tracker API Running",
  });
});

module.exports = app;