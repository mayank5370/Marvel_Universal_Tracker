require("dotenv").config();

const requiredEnvVariables = [
  "PORT",
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "INGEST_API_KEY",
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(
      `Missing required environment variable: ${variable}`
    );
  }
});

module.exports = {
  nodeEnv: process.env.NODE_ENV,

  port: process.env.PORT,

  databaseUrl: process.env.DATABASE_URL,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRES_IN,

  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRES_IN,

  ingestApiKey: process.env.INGEST_API_KEY,

  clientUrl: process.env.CLIENT_URL,

  redisHost: process.env.REDIS_HOST,

  redisPort: process.env.REDIS_PORT,
};