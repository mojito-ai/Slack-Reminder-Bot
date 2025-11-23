require("dotenv").config();
const { App, ExpressReceiver } = require("@slack/bolt");

// ExpressReceiver for HTTP mode
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: "/slack/events",   // Slack events endpoint
});

// Bolt App
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
  socketMode: false,
});

module.exports = { app, receiver };