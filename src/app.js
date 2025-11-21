const { App } = require("@slack/bolt");
require("dotenv").config();

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;

const app = new App({
  token: SLACK_BOT_TOKEN,
  appToken: SLACK_APP_TOKEN,
  socketMode: true
});

// Register event handlers
require("./events/messageHandler")(app);

module.exports = app;
