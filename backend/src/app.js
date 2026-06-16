const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./config/env");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const adminRoutes = require("./modules/auth/admin.route");

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());



const testRoutes = require("./routes/test.route");

const authRoutes = require("./modules/auth/auth.routes");

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/admin", adminRoutes);

app.use(globalErrorHandler);




app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Marvel Tracker API Running",
  });
});

module.exports = app;