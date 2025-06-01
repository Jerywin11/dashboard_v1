const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express();
const HTTPS_PORT = process.env.PORT || 5000; // HTTPS port
const HTTP_PORT = 8080; // HTTP port for redirect (optional)

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "server.crt")),
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("🔐 HTTPS Server is running");
});

app.get("/api/user", (req, res) => {
  const user = {
    id: 1,
    username: "zerobyte",
    email: "zerobyte@email.com",
    first_name: "Zero",
    last_name: "Byte",
    role: "admin",
  };
  res.json(user);
});

// Create HTTPS server
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`✅ HTTPS Server running at https://localhost:${HTTPS_PORT}`);
});

// (Optional) Redirect HTTP to HTTPS
http
  .createServer((req, res) => {
    const host = req.headers.host.replace(/:\d+$/, `:${HTTPS_PORT}`);
    res.writeHead(301, { Location: `https://${host}${req.url}` });
    res.end();
  })
  .listen(HTTP_PORT, () => {
    console.log(
      `🔁 HTTP redirect server running at http://localhost:${HTTP_PORT}`
    );
  });
