const sinon = require('sinon');
const chai = require('chai');
const productControler = require('../../../controllers/productController');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesControler = require('../../../controllers/salesController');


describe('testando se o controler dos Produtos', function () {
  beforeEach(() => {
    sinon.restore();
  });
  it('Adiciona uma nova venda', async function () {
    const dbItems = 3

    sinon.stub(salesService, 'addSales').resolves(dbItems)
    sinon.stub(salesService, 'checkIfExists').resolves([1])

    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.body = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    await salesControler.addSales(req, res)

    expect(res.status.calledWith(201)).to.be.equal(true)
  })
})