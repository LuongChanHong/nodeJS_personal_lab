const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((data) => {
      res.render("shop/index", {
        prods: data,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log("err:", err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((data) => {
      res.render("shop/product-list", {
        prods: data,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log("err:", err));
  // Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     pageTitle: "All Products",
  //     path: "/products",
  //   });
  // });
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  Product.findById(productID)
    .then((product) => {
      console.log("product:", product);
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log("err:", err));
};

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.findById(productID)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log("err:", err));
};

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((result) => {
//       console.log("result:", result);
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//       });
//     })
//     .catch((err) => console.log("err:", err));
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      // console.log("user.cart.items:", user.cart.items);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: user.cart.items,
      });
    })
    .catch((err) => console.log("err:", err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;
  req.user
    .deleteFromCart(productID)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log("err:", err));
};

// exports.postOrder = (req, res, next) => {
//   req.user
//     .createOrder()
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log("err:", err));
// };
