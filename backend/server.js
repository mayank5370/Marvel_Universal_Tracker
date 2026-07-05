const http = require("http");

const env = require("./src/config/env");

const app = require("./src/app");

const server = http.createServer(app);

const { startRSSScheduler, } = require("./src/scheduler/rss.scheduler");

server.listen(env.port, () => {
  console.log(`
=====================================
 Marvel Tracker API Started
=====================================

 Environment : ${env.nodeEnv}
 Port        : ${env.port}

=====================================
`);

console.log("Starting scheduler...");
startRSSScheduler();
console.log("Scheduler started.");

});