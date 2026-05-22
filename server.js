const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Fichier introuvable");
      return;
    }

    const ext = path.extname(filePath);
    const type = ext === ".png" ? "image/png" : "text/html; charset=utf-8";

    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SagaVerse running on port ${PORT}`);
});
