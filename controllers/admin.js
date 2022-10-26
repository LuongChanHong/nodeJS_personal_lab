const Product = require("../models/product");
const User = require("../models/user");
// const User = require("../models/user");

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
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      console.log("result:", result);
      res.redirect("/");
    })
    .catch((err) => console.log("::ERROR:", err));
};

exports.postEditProduct = (req, res, next) => {
  Product.findById(req.body.productID)
    .then((product) => {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      product.price = req.body.price;
      return product.save();
    })
    .then(() => {
      // console.log("result:", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("::ERROR:", err));
};

exports.getEditProduct = (req, res, next) => {
  //query param set optional information
  const editMode = req.query.edit;
  const productID = req.params.productID;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(productID)
    .then((product) => {
      if (!product) {
        return redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log("err:", err));
};
// thêm thuộc tính của collection khác
// nếu muốn thêm item collection đó vào result của then
// .find().populate("attribute_name").then

// chọn/ bỏ chọn các thuộc tính muốn được trả về trong result
// .find().select("attribute_need attribute_need -attribute_dont").then
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log("err:", err));
};

exports.postDeleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.body.productID)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("err:", err));
};
