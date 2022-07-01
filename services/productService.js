const Joi = require('joi');
const { runSchema } = require('../middlewares/nameStringError');
const ThrowingError = require('../middlewares/NotFoundError');
const productModel = require('../models/productModel');

const productService = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().min(5).required(),
  })),
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
  async add(name) {
    const newId = productModel.addProduct(name);
    return newId;
  },
  async change(id, name) {
    const changed = await productModel.changeProduct(id, name);
    if (changed) {
      return {
        id,
        name,
      };
    }
  },
  async deleteItem(id) {
    await productModel.delete(id);
  },
};

module.exports = productService;