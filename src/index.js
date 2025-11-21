require("dotenv").config();

const app = require("./app");
const { startHttpServer } = require("./http/healthcheck");

(async () => {
  await app.start();
  console.log("⚡ Slack forwarder running via Socket Mode");

  startHttpServer();
})();
