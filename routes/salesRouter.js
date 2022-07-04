const { Router } = require('express');
const salesControler = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', salesControler.addSales);
salesRouter.get('/', salesControler.getSales);

module.exports = salesRouter;