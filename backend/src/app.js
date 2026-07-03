const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./config/env");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const adminDashboardRoutes = require("./modules/admin/dashboard/dashboard.route");
const contentRoutes = require("./modules/content/content.routes");
const watchlistRoutes = require("./modules/watchlist/watchlist.routes");
const adminSourceRoutes = require("./modules/admin/source/source.route");
const moderationRoutes = require("./modules/admin/moderation/moderation.route");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./api-docs/swagger");


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

app.use("/api/admin", adminDashboardRoutes);

app.use("/api/admin", adminSourceRoutes);

app.use("/api/admin", moderationRoutes);

app.use("/api", contentRoutes);

app.use("/api", watchlistRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(globalErrorHandler);




app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Marvel Tracker API Running",
  });
});

module.exports = app;