const ThrowingError = require('../middlewares/NotFoundError');
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
    if (item.length === 0) {
      ThrowingError('Product not found');
    }
  },
  // async add(name) {
  //   productModel.
  // }
};

module.exports = productService;