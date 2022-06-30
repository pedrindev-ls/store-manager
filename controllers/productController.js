const productService = require('../services/productService');

const productControler = {
  async getProducts(_req, res) {
    const products = await productService.get();
    res.status(200).json(products);
  },
  async getId(req, res) {
    try {
      const { id } = req.params;
      await productService.checkIfExists(id);
      const product = await productService.getId(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  // async registration(req, res) {
  //   const { name } = req.body;
  //   await productService.add(name);
  // },
};

module.exports = productControler;