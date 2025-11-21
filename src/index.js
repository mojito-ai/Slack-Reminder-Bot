require("dotenv").config();

// Starts tiny HTTP server (required by AWS App Runner)
require("./http/healthcheck");

const app = require("./app");

(async () => {
  await app.start();
  console.log("⚡ Slack forwarder running via Socket Mode");
})();
