const { matchesKeywords } = require("../utils/keywords");

const CHANNEL_A = process.env.CHANNEL_A;
const CHANNEL_B = process.env.CHANNEL_B;

module.exports = function registerMessageHandler(app) {
  app.event("message", async ({ event, client, logger }) => {

    // Ignore bot messages, edits, file uploads
    if (event.subtype || event.bot_id) return;

    // Only handle messages from CHANNEL_A
    if (event.channel !== CHANNEL_A) return;

    // Ignore thread replies
    if (event.thread_ts && event.thread_ts !== event.ts) return;

    const text = event.text || "";
    if (!matchesKeywords(text)) return;

    console.log(`Forwarding message from ${CHANNEL_A} to ${CHANNEL_B}:`, text);

    let permalink = null;
    try {
      const resp = await client.chat.getPermalink({
        channel: CHANNEL_A,
        message_ts: event.ts,
      });
      if (resp.ok) permalink = resp.permalink;
    } catch (e) {
      logger.warn("Failed to get permalink", e);
    }

    const forwardText = [
      `Forwarded from <#${CHANNEL_A}> by <@${event.user}>:`,
      text.trim(),
      permalink || "",
    ].filter(Boolean).join("\n");

    try {
      await client.chat.postMessage({
        channel: CHANNEL_B,
        text: forwardText,
      });
    } catch (e) {
      logger.error("Failed to forward message", e);
    }
  });
};
