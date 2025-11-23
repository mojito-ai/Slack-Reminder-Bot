const http = require("http");

function startHttpServer() {
  const port = process.env.HEALTHCHECK_PORT || 3001; // change default port

  const server = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200);
      res.end("OK");
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(port, () => {
    console.log(`Healthcheck server running on port ${port}`);
  });

  server.on("error", (err) => {
    console.error("HTTP server error:", err);
  });
}

module.exports = { startHttpServer };
