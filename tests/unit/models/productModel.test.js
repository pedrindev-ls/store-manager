const sinon = require('sinon');
const chai = require('chai');
const productModel = require('../../../models/productModel');
const { expect } = require('chai');
const db = require('../../../models/db')

describe('testando se o model dos Produtos', function () {
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
  it('adiciona um novo produto', async function () {
    const dbItem = [{ insertId: 4 }]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await productModel.addProduct('Pedro')

    expect(item).to.be.eql(4)
  })
  it('altera um produto', async function () {
    const dbItem = [{ changedRows: 1 }]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await productModel.changeProduct(1, 'Pedro')

    expect(item).to.be.equal(true)
  })
  it('deleta um produto', async function () {
    const sql = `
    DELETE FROM StoreManager.products
    WHERE id = ?
    `;
    sinon.stub(db, 'query').resolves()
    await productModel.delete(3)

    expect(db.query.calledWith(sql, [3])).to.be.equal(true)
  })
})