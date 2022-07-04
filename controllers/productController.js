const { validateBodyAdd } = require('../services/productService');
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
    try {
      const { name } = await validateBodyAdd(req.body);
      const newIdProduct = await productService.add(name);
      res.status(201).json({
        id: newIdProduct,
        name,
      });
    } catch (error) {
      if (error.message === '"name" is required') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(422).json({ message: error.message });
    }
  },
  async changeProduct(req, res) {
    try {
      const { id } = req.params;
      const { name } = await validateBodyAdd(req.body);
      await productService.checkIfExists(id);
      const itemChanged = await productService.change(id, name);
      return res.status(200).json(itemChanged);
    } catch (error) {
      if (error.message === '"name" is required') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === '"name" length must be at least 5 characters long') {
        return res.status(422).json({ message: error.message });
      }
      res.status(404).json({ message: error.message });
    }
  },
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await productService.checkIfExists(id);
      await productService.deleteItem(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
};

module.exports = productControler;