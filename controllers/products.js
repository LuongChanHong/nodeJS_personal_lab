const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  // rootDirectory thay thế cho __dirname, "../"
  // response.sendFile(path.join(rootDirectory, "views", "add-product.html"));
  response.render("add-product", {
    docTitle: "Add Product",
    activePage: "add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
};

exports.postAddProduct = (request, response) => {
  const product = new Product(request.body.title);
  product.save();
  response.redirect("/");
};

exports.getProducts = (request, response, next) => {
  // callback trong fetchAll sẽ tự thực thi khi fetchAll thực thi xong
  Product.fetchAll((productList) => {
    // render template html chứa nội dung động
    response.render("product-list", {
      prods: productList,
      docTitle: "Shop",
      activePage: "/",
      hasProduct: productList.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
