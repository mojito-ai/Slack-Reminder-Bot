require("dotenv").config();

const { app, receiver } = require("./app");
const { startHttpServer } = require("./http/healthcheck");

// Slack URL verification handler
receiver.app.post("/", async (req, res) => {
  if (req.body?.type === "url_verification") {
    return res.send(req.body.challenge);
  }
  res.sendStatus(200);
});

(async () => {
  const port = process.env.PORT || 3000;

  await app.start(port);
  console.log(`⚡ Slack forwarder running in HTTP mode on port ${port}`);

  startHttpServer();
})();
