const fs = require("fs");
const path = require("path");
const rootFolder = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (callbackFuncion) => {
  fs.readFile(rootFolder, (error, fileContent) => {
    if (error) {
      callbackFuncion([]);
    } else {
      callbackFuncion(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(rootFolder, JSON.stringify(products), (error) =>
        console.log(error)
      );
    });
  }

  static fetchAll(callbackFuncion) {
    getProductsFromFile(callbackFuncion);
  }
};
