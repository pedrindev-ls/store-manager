const { Router } = require('express');
const productControler = require('../controllers/productController');

const productsRouter = Router();

productsRouter.get('/:id', productControler.getId);
productsRouter.get('/', productControler.getProducts);

module.exports = productsRouter;