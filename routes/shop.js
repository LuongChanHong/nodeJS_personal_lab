const express = require("express");
const path = require("path");
const router = express.Router();

// __dirname đại diện cho thư mục cha chứa file hiện tại (routes)
// path.join sẽ tạo url(file system) chạy được trên cả win và linux
// do có tính năng xác nhận hệ điều hành đang chạy và tạo url tương ứng
router.get("/", (request, response, next) => {
  response.sendFile(path.join(__dirname, "../", "MVCviews", "shop.html"));
});

module.exports = router;
