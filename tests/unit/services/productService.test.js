const sinon = require('sinon');
const chai = require('chai');
const productService = require('../../../services/productService');
const { expect } = require('chai');
const ThrowingError = require('../../../middlewares/NotFoundError');
const productModel = require('../../../models/productModel');

describe('testando se o Service dos Produtos', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('Retorna um array com todos os produtos', async function () {
    const dbItems =[
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
    sinon.stub(productModel, 'listItems').resolves(dbItems)
    const items = await productService.get()

    expect(items).to.be.eql(dbItems)
  })
  it('retorna um objeto de acordo com o id', async function () {
    const dbItem = {
        id: 1,
        name: 'Martelo de Thor'
      }

    sinon.stub(productModel, 'listItem').resolves(dbItem)

    const item = await productService.getId(1)

    expect(item).to.be.eql(dbItem)
  })
  it('chama a função do erro caso o id não exista', async function () {
    sinon.stub(productModel, 'exists').resolves([])
    try {
      const item = await productService.checkIfExists(94654)
    } catch (error) {
      expect(error.message).to.be.equal('Product not found')
    }
  })
  it('retorna um id de um produto adicionado', async function () {
    const dbItem = 4
    const product = 'Doce de leite'

    sinon.stub(productModel, 'addProduct').resolves(dbItem)
    const item = await productService.add(product)

    expect(item).to.be.equal(4)
  })
  it('Altera altera um produto', async function () {
    sinon.stub(productModel, 'changeProduct').resolves(true)

    const item = await productService.change(1, 'Pedro')
    
    expect(item).to.be.eql({ id: 1, name: 'Pedro' })
  })
})