require("dotenv").config();

const express = require("express");
const { app, receiver } = require("./app");
const { startHttpServer } = require("./http/healthcheck");

// Required so Slack's JSON body is parsed
receiver.app.use(express.json());

// Slack URL Verification
receiver.app.post("/", (req, res) => {
  if (req.body?.type === "url_verification") {
    return res.status(200).send(req.body.challenge);
  }
  res.sendStatus(200);
});

(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);

  console.log(`⚡ Slack forwarder running in HTTP mode on port ${port}`);

  startHttpServer();
})();
