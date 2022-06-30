const sinon = require('sinon');
const chai = require('chai');
const productControler = require('../../controllers/productController');
const { expect } = require('chai');
const productService = require('../../services/productService');
const productModel = require('../../models/productModel');

describe('testando se o controler', function () {
  beforeEach(() => {
    sinon.restore();
  });
  it('retorna um status 200 e uma lista de produtos', async function () {
    const dbItems = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ]

    sinon.stub(productService, 'get').resolves(dbItems)

    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()

    await productControler.getProducts(req, res)

    expect(res.status.calledWith(200)).to.be.equal(true)
    expect(res.json.calledWith(dbItems)).to.be.equal(true)
  })
  it('retorna um status 200 e o produto do id selecionado', async function () {
    const dbItem = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
    ]

    sinon.stub(productService, 'getId').resolves(dbItem)

    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 1 }

    await productControler.getId(req, res)

    expect(res.status.calledWith(200)).to.be.equal(true)
    expect(res.json.calledWith(dbItem)).to.be.equal(true)
  })
  it('retorna um erro caso o id do produto não exista', async function () {
    const dbItem = []
    
    sinon.stub(productModel, 'exists').resolves(dbItem)

    const res = {}
    const req = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 65848 }

    await productControler.getId(req, res)

    expect(res.status.calledWith(404)).to.be.equal(true)
  })
})