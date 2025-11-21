require("dotenv").config();

// Starts tiny HTTP server (required by AWS App Runner)
const { startHttpServer } = require("./healthcheck");
startHttpServer();

const app = require("./app");

(async () => {
  await app.start();
  console.log("⚡ Slack forwarder running via Socket Mode");
})();
