const { Router } = require('express');
const salesControler = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesControler.getSalesWithId);
salesRouter.delete('/:id', salesControler.deleteSale);
salesRouter.post('/', salesControler.addSales);
salesRouter.get('/', salesControler.getSales);

module.exports = salesRouter;