require("dotenv").config();

const { app } = require("./app");
const { startHttpServer } = require("./http/healthcheck");

(async () => {
  const port = process.env.PORT || 3000;

  await app.start(port);
  console.log(`⚡ Slack forwarder running in HTTP mode on port ${port}`);

  startHttpServer();
})();
