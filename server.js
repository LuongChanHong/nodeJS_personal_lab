const http = require("http");
const express = require("express");

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
  response.status(404).send("<h1>Page not found</h1>");
});

const server = http.createServer(app);

server.listen(3000);
