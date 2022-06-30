const sinon = require('sinon');
const chai = require('chai');
const productService = require('../../services/productService');
const { expect } = require('chai');
const ThrowingError = require('../../middlewares/NotFoundError');

describe('testando se o Service', () => {
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
    const items = await productService.get()

    expect(items).to.be.eql(dbItems)
  })
  it('retorna um objeto de acordo com o id', async function () {
    const dbItem = [
      {
        id: 1,
        name: 'Martelo de Thor'
      },
    ]
    const item = await productService.getId(1)

    expect(item).to.be.eql(dbItem[0])
  })
  it('chama a função do erro caso o id não exista', async function () {
    try {
      const item = await productService.checkIfExists(94654)
    } catch (error) {
      expect(error.message).to.be.equal('Product not found')
    }
  })
})