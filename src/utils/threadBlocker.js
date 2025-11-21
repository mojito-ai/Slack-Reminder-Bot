// src/utils/threadBlocker.js

// We keep a list of thread roots we should ignore.
// Root = the ts of the original top-level message we forwarded.
const blockedThreads = new Set();

function isBlockedThread(event) {
  // A reply has event.thread_ts !== event.ts
  if (!event.thread_ts) return false;
  return blockedThreads.has(event.thread_ts);
}

function markThreadBlocked(rootTs) {
  blockedThreads.add(rootTs);
}

module.exports = {
  isBlockedThread,
  markThreadBlocked
};
