const sinon = require('sinon');
const chai = require('chai');
const productControler = require('../../../controllers/productController');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');
const { validateBodyAdd } = require('../../../services/productService');

describe('testando se o controler dos Produtos', function () {
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

    expect(res.status.calledWith(404)).to.be.eql(true)
  })
  // registration, change, delete
  it('adiciona um novo produto', async function () {
    const dbItem = 4
    const jsonReturn = {
      id: 4,
      name: 'pedrao'
    }

    sinon.stub(productService, 'add').resolves(dbItem)

    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.body = { name: 'pedrao' }

    await productControler.registration(req, res)

    expect(res.status.calledWith(201)).to.be.equal(true)
    expect(res.json.calledWith(jsonReturn)).to.be.equal(true)
  })
  it('envia um erro se o produto for menor que 5 letras para adicionar', async function () {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.body = { name: 'pedr' }

    await productControler.registration(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true)
  })
  it('envia um erro se não for eviada nenhuma informação para adicionar o produto', async function () {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.body = {  }

    await productControler.registration(req, res)

    expect(res.status.calledWith(400)).to.be.equal(true)
  })
  it('altera as informações o produto', async function () {
    const dbItem = {
      id: 1,
      name: 'Pedro'
    }

    sinon.stub(productService, 'change').resolves(dbItem)
    
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 1 }
    req.body = { name: 'Pedro' }
    
    await productControler.changeProduct(req, res)

    expect(res.status.calledWith(200)).to.be.equal(true)
    expect(res.json.calledWith(dbItem)).to.be.equal(true)
  })
  it('retorna um erro caso o nome tenha menos de 5 letras para trocar o nome do produto ', async function () {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 1 }
    req.body = { name: 'Pedr' }

    await productControler.changeProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true)
  })
  it('retorna um erro caso não tenha "name" para trocar o nome do produto ', async function () {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 1 }
    req.body = {  }

    await productControler.changeProduct(req, res)

    expect(res.status.calledWith(400)).to.be.equal(true)
  })
  it('retorna um erro caso não tenha o "id" do produto para trocar o nome', async function () {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 3848 }
    req.body = { name: 'Pedro' }

    await productControler.changeProduct(req, res)

    expect(res.status.calledWith(404)).to.be.equal(true)
  })
  it('deleta um produto', async function () {
    sinon.stub(productService, 'deleteItem').resolves()    
    
    const req = {}
    const res = {}
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub()
    req.params = { id: 1 }

    await productControler.deleteProduct(req, res)

    expect(res.status.calledWith(204)).to.be.equal(true)
  })
})