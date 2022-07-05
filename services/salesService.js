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
    const items = await salesProductModel.listItems();
    const convertedItems = items
      .map((element) => ({
        saleId: element.sale_id,
        productId: element.product_id,
        date: element.date,
        quantity: element.quantity,
      }));
    return convertedItems;
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
  async checkIfSaleExists(id) {
    const item = await salesModel.existSale(id);

    if (item.length === 0) {
      ThrowingError('Sale not found');
    }
  },
  async getId(id) {
    const item = await salesModel.getId(id);
    return item;
  },
  async getSales(id) {
    const item = await salesProductModel.getWithId(id);
    const convertedItem = item
      .map((element) => ({
        productId: element.product_id,
        date: element.date,
        quantity: element.quantity,
      }));
    return convertedItem;
  },
};

module.exports = salesService;