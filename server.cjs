const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname, "dist");

app.use(express.static(`${__dirname}/dist`));

app.get("/*", (request, response) => {
  const indexPath = path.join(publicPath, "index.html");

  if (fs.existsSync(indexPath)) {
    response.status(200).sendFile(indexPath);
  } else {
    response.status(200).send("File not found");
  }

  response.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
