const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./config/env");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const testRoutes = require("./routes/test.route");
const authRoutes = require("./modules/auth/auth.routes");
const adminDashboardRoutes = require("./modules/admin/dashboard/dashboard.route");
const contentRoutes = require("./modules/content/routes/content.routes");
const watchlistRoutes = require("./modules/watchlist/watchlist.routes");
const adminSourceRoutes = require("./modules/admin/source/source.route");
const moderationRoutes = require("./modules/admin/moderation/moderation.route");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./api-docs/swagger");
const requestLogger = require("./middlewares/requestLogger");
const requestId = require("./middlewares/requestId");
const notificationRoutes = require("./modules/notifications/notification.route");
const helmet = require("helmet");
const compression = require("compression");
const {
    authLimiter,
    apiLimiter,
    adminLimiter,
} = require("./config/rateLimiter");




const ingestRoutes = require("./modules/ingest");



const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

app.use(express.json());

app.use(requestId);

app.use(requestLogger);

app.use(cookieParser());



app.use("/api/ingest", ingestRoutes);

app.use("/api/auth", authLimiter, authRoutes);

app.use("/api/test", apiLimiter, testRoutes);

app.use("/api/admin", adminLimiter, adminDashboardRoutes);

app.use("/api/admin", adminLimiter, adminSourceRoutes);

app.use("/api/admin", adminLimiter, moderationRoutes);

app.use("/api", apiLimiter, contentRoutes);

app.use("/api", apiLimiter, watchlistRoutes);

app.use("/api", apiLimiter, notificationRoutes);

app.use(
  "/api-docs",
  apiLimiter,
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