const Joi = require('joi');
const { runSchema } = require('../middlewares/nameStringError');
const ThrowingError = require('../middlewares/NotFoundError');
const productModel = require('../models/productModel');
const salesModel = require('../models/salesModel');
const salesProductModel = require('../models/salesProductModel');

const salesService = {
  validateAddBody: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().min(1).required(),
  })),
  async get() {
    const items = await salesModel.listItems();
    return items;
  },
  async addSales(sales) {
    const saleId = await salesModel.add();
    await salesProductModel.add(saleId, sales);
    return saleId;
  },
  async checkIfExists(id) {
    const item = await productModel.exists(id);

    if (item.length === 0) {
      ThrowingError('Product not found');
    }
  },
};

module.exports = salesService;