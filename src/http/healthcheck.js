const http = require("http");

function startHttpServer() {
  const port = process.env.PORT || 3000;

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
}

module.exports = { startHttpServer };