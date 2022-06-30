const productService = require('../services/productService');

const productControler = {
  async getProducts(_req, res) {
    const products = await productService.get();
    res.status(200).json(products);
  },
  async getId(req, res) {
    const { id } = req.params;
    // const exists = await productService.checkIfExists();
    const product = await productService.getId(id);
    // if (exists.stats === 404) {
    //   return res.status(exists.stats).json(exists.message);
    // }
    res.status(200).json(product);
  },
};

module.exports = productControler;