const express = require("express");
const path = require("path");

const router = express.Router();
const rootDirectory = require("../util/path");

// /admin/add-product
router.get("/add-product", (request, response, next) => {
  // rootDirectory thay thế cho __dirname, "../"
  response.sendFile(path.join(rootDirectory, "MVCviews", "add-product.html"));
});

// /admin/product
router.post("/product", (request, response) => {
  console.log(request.body);
  response.redirect("/");
});

module.exports = router;
