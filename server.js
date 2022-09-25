const http = require("http");
const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// xử lí parse cho data request body gửi từ form input
// như đã xử lí trong lab04 (Buffer.concat(chunkDataFromRequest).toString())
// extended: false: cho phép parse các feature ngoài mặc định
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use((request, response, next) => {
  response.status(404).sendFile(path.join(__dirname, "MVCviews", "404.html"));
});

const server = http.createServer(app);

server.listen(3000);
