const sinon = require('sinon');
const chai = require('chai');
const productModel = require('../../models/productModel');
const { expect } = require('chai');
const db = require('../../models/db')

describe('testando se o model', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('retorna um array de objetos com os produtos', async function () {
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
    sinon.stub(db, 'query').resolves([dbItems])
    const items = await productModel.listItems();
    console.log(items);

    expect(items).to.be.equal(dbItems)
  })
  it('retorna um item caso o id exista', async function () {
    const dbItem = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
    ]
    sinon.stub(db, 'query').resolves([dbItem])
    const item = await productModel.listItem(1)

    expect(item).to.be.equal(dbItem[0])
  })
  it('retorna um array vazio caso o id não exista', async function () {
    const dbItem = []
    sinon.stub(db, 'query').resolves([dbItem])
    const item = await productModel.exists(934785)

    expect(item).to.be.equal(dbItem)
  })
})