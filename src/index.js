require("dotenv").config();
const { app } = require("./app");
const { startHttpServer } = require("./http/healthcheck");
const registerMessageHandler = require("./handlers/messageHandler");

// Register handler
registerMessageHandler(app);

(async () => {
  const port = process.env.PORT || 3000;

  await app.start(port);
  console.log(`⚡ Slack forwarder running in HTTP mode on port ${port}`);

  startHttpServer();
})();
