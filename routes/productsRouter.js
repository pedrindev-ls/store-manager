const { Router } = require('express');
const productControler = require('../controllers/productController');

const productsRouter = Router();

productsRouter.get('/:id', productControler.getId);
productsRouter.put('/:id', productControler.changeProduct);
productsRouter.post('/', productControler.registration);
productsRouter.get('/', productControler.getProducts);

module.exports = productsRouter;