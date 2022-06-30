const productModel = require('../models/productModel');

const productService = {
  async get() {
    const items = await productModel.listItems();
    return items;
  },
  async getId(id) {
    const item = await productModel.listItem(id);
    return item;
  },
  async checkIfExists(id) {
    const item = await productModel.exists(id);
    console.log(item);
    if (item) {
      return {
        stats: 404,
        message: 'Product not found',
      };
    }
  },
};

module.exports = productService;