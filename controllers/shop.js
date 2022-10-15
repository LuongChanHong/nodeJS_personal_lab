const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findById(productID, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("shop/index", {
        prods: data,

        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log("err:", err));
};

// exports.getCart = (req, res, next) => {
//   res.render("shop/cart", {
//     path: "/cart",
//     pageTitle: "Your Cart",
//   });
// };

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  // console.log("productID:", productID);
  let newQuantity = 1;
  let _cart;
  req.user
    .getCart()
    .then((cart) => {
      _cart = cart;
      return cart.getProducts({ where: { id: productID } });
    })
    .then((products) => {
      let product;
      // trường hợp đã có product trong cart
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
      }
      // trường hợp chưa có product trong cart
      return Product.findByPk(productID);
    })
    .then((product) => {
      _cart.addProduct(product, { through: { quantity: newQuantity } });
      res.redirect("/cart");
    })
    .catch((err) => console.log("err:", err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      cart
        .getProducts()
        .then((products) => {
          // console.log("products:", products);
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          });
        })
        .catch((err) => console.log("err:", err));
    })
    .catch((err) => console.log("err:", err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productsID = req.body.productID;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productsID } });
    })
    .then((products) => {
      let product = products[0];
      product.cartItem.destroy();
      res.redirect("/cart");
    })
    .catch((err) => console.log("err:", err));
};
