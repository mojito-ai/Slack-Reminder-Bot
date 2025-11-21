const http = require("http");

module.exports = function startHttpServer() {
  const port = process.env.PORT || 3000;

  const server = http.createServer((req, res) => {
    if (req.url === "/health") {
      res.writeHead(200);
      return res.end("OK");
    }
    res.writeHead(200);
    res.end("Slack Forwarder Running");
  });

  server.listen(port, () =>
    console.log(`💚 Health check server running on port ${port}`)
  );
};
