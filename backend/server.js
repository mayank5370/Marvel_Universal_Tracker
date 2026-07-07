const http = require("http");

const env = require("./src/config/env");

const app = require("./src/app");

const server = http.createServer(app);

const { Server } = require("socket.io");
const { initializeSocket } = require("./src/socket/socket");



server.listen(env.port, () => {
  console.log(`
=====================================
 Marvel Tracker API Started
=====================================

 Environment : ${env.nodeEnv}
 Port        : ${env.port}

=====================================
`);

});

const io = new Server(server, {
    cors: {
        origin: env.clientUrl,
        credentials: true,
    },
});

initializeSocket(io);