require("dotenv").config();
const { App, ExpressReceiver } = require("@slack/bolt");

// Create Express receiver
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Create Bolt app in HTTP mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,                     // <= use ExpressReceiver
  socketMode: false,
});

module.exports = { app, receiver };
