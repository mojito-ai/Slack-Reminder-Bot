// src/utils/keywords.js

// Read keyword list from environment variable:
//
// KEYWORDS=Car,CarPlay,Android-Auto,Android Auto,AndroidAuto,AAOS,Automotive,Car Play
//
const KEYWORDS = (process.env.KEYWORDS || "")
  .split(",")
  .map(k => k.trim())
  .filter(Boolean);

// Escape regex special chars (like - or +)
function escapeRegex(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

// Create whole-word, case-insensitive regex for each keyword
const KEYWORD_PATTERNS = KEYWORDS.map(k =>
  new RegExp(`\\b${escapeRegex(k)}\\b`, "i")
);

// Check if message contains any keyword
function matchesKeywords(text = "") {
  return KEYWORD_PATTERNS.some(pattern => pattern.test(text));
}

module.exports = {
  KEYWORDS,
  matchesKeywords
};
