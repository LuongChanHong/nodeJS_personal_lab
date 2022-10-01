const { response } = require("express");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price, "");
  product.save();
  res.redirect("/");
};

exports.postEditProduct = (req, res, next) => {
  const updateProduct = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price,
    req.body.productID
  );
  updateProduct.save();
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  //query param set optional information
  const editMode = req.query.edit;
  const productID = req.params.productID;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(productID, (product) => {
    if (!product) {
      return redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  console.log("value:", req.body.productID);
};
