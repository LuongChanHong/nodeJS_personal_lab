const express = require("express");
const router = express.Router();

// get() chỉ hoạt động khi có resquest get, vừa đảm bảo chỉ hoạt động khi path chính xác
router.get("/", (request, response, next) => {
  response.send("<h1>some html page</h1>");
});

module.exports = router;
