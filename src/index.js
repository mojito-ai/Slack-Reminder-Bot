require("dotenv").config();

const express = require("express");
const { app, receiver } = require("./app");
const { startHttpServer } = require("./http/healthcheck");

// Slack URL verification MUST NOT parse body before Bolt sees it
receiver.router.post("/slack/events", (req, res) => {
  if (req.body?.type === "url_verification") {
    return res.send(req.body.challenge);
  }
  return res.sendStatus(200);
});

(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);

  console.log(`⚡ Slack forwarder running in HTTP mode on port ${port}`);

  startHttpServer();
})();
