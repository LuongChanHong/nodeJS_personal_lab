const express = require("express");
const path = require("path");

const router = express.Router();
const rootDirectory = require("../util/path");

// path.join sẽ tạo url(file system) chạy được trên cả win và linux
// do có tính năng xác nhận hệ điều hành đang chạy và tạo url tương ứng
router.get("/", (request, response, next) => {
  // rootDirectory thay thế cho __dirname, "../"
  response.sendFile(path.join(rootDirectory, "MVCviews", "shop.html"));
});

module.exports = router;
