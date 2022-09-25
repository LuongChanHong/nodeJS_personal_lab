const express = require("express");
const router = express.Router();

// /admin/add-product
router.get("/add-product", (request, response, next) => {
  response.send(
    "<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>add product</button></form>"
  );
});

// /admin/product
router.post("/product", (request, response) => {
  console.log(request.body);
  response.redirect("/");
});

module.exports = router;
