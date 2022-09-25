const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

// không xài () sau tên function, vì ta chưa thực thi ngay function
router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;
