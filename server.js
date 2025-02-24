const express = require('express');
const path = require('path');

const app = express();
const PORT = 7000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Set proper content type for compressed files
app.use((req, res, next) => {
  if (req.url.endsWith(".js.gz")) {
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", "application/javascript");
  } else if (req.url.endsWith(".wasm.gz")) {
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", "application/wasm");
  } else if (req.url.endsWith(".data.gz")) {
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", "application/octet-stream");
  }
  next();
});

// Serve index.html correctly from Build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});