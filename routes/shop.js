const express = require("express");
const path = require("path");

const router = express.Router();
const rootDirectory = require("../util/path");
const adminData = require("./admin");

router.get("/", (request, response, next) => {
  const products = adminData.products;
  // render template html chứa nội dung động
  response.render("shop", { prods: products, docTitle: "Shop" });
});

exports.route = router;
