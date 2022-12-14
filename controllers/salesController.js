const salesService = require('../services/salesService');

const salesControler = {
  async getSales(_req, res) {
    const sales = await salesService.get();
    res.status(200).json(sales);
  },
  async addSales(req, res) {
    try {
      const salesItems = req.body;
      salesItems.map((element) => salesService.validateAddBody(element));
      const errorTest = salesItems.map((element) => salesService.checkIfExists(element.productId));
      await Promise.all(errorTest);
      const saleId = await salesService.addSales(salesItems);
      return res.status(201).json({ id: saleId, itemsSold: salesItems });
    } catch (error) {
      if (error.message.includes('required')) {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === '"quantity" must be greater than or equal to 1') {
        return res.status(422).json({ message: error.message });
      }
      res.status(404).json({ message: error.message });
    }
  },
  async getSalesWithId(req, res) {
    try {
      const { id } = req.params;
      await salesService.checkIfSaleExists(id);
      const idOfSale = await salesService.getId(id);
      const item = await salesService.getSales(idOfSale);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  async deleteSale(req, res) {
    try {
      const { id } = req.params;
      await salesService.checkIfSaleExists(id);
      await salesService.deleteSaledItems(id);
      return res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = salesControler;