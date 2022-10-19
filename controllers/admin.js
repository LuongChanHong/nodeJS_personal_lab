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
  req.user
    .createProduct({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description,
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log("err:", err));
};

// exports.postEditProduct = (req, res, next) => {
//   const updateProduct = new Product(
//     req.body.title,
//     req.body.imageUrl,
//     req.body.description,
//     req.body.price,
//     req.body.productID
//   );
//   updateProduct.save();
//   res.redirect("/admin/products");
// };

// exports.getEditProduct = (req, res, next) => {
//   //query param set optional information
//   const editMode = req.query.edit;
//   const productID = req.params.productID;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   req.user
//     .getProducts({ where: { id: productID } })
//     .then((products) => {
//       if (!products) {
//         return redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: products[0].dataValues,
//       });
//     })
//     .catch((err) => console.log("err:", err));
// };

// exports.getProducts = (req, res, next) => {
//   Product.findAll()
//     .then((data) => {
//       res.render("admin/products", {
//         prods: data,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => console.log("err:", err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   Product.deleteById(req.body.productID);
//   res.redirect("/admin/products");
// };
