const express = require("express");
const path = require("path");

const router = express.Router();

// /admin/add-product
router.get("/add-product", (request, response, next) => {
  response.sendFile(
    path.join(__dirname, "../", "MVCviews", "add-product.html")
  );
});

// /admin/product
router.post("/product", (request, response) => {
  console.log(request.body);
  response.redirect("/");
});

module.exports = router;
