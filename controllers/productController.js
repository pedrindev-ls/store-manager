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
  async registration(req, res) {
    const { name } = req.body;
    const newIdProduct = await productService.add(name);
    res.status(201).json({
      id: newIdProduct,
      name,
    });
  },
};

module.exports = productControler;