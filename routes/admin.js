const express = require("express");
const path = require("path");

const router = express.Router();
const rootDirectory = require("../util/path");

const products = [];

// /admin/add-product
router.get("/add-product", (request, response, next) => {
  // rootDirectory thay thế cho __dirname, "../"
  // response.sendFile(path.join(rootDirectory, "MVCviews", "add-product.html"));
  response.render("add-product", {
    docTitle: "Add Product",
    activePage: "add-product",
  });
});

// /admin/product
router.post("/add-product", (request, response) => {
  products.push({ title: request.body.title });
  response.redirect("/");
});

exports.route = router;
exports.products = products;
