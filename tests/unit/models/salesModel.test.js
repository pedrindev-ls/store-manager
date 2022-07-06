const sinon = require('sinon');
const chai = require('chai');
const salesModel = require('../../../models/salesModel');
const { expect } = require('chai');
const db = require('../../../models/db')

describe('testando se o model dos Produtos', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Adiciona uma venda', async function () {
    const dbItem = [{ insertId: 3 }]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await salesModel.add()

    expect(item).to.be.equal(3)
  })
  it('retorna um array vazio se a compra não existir', async function () {
    const dbItem = [[]]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await salesModel.existSale(34387)

    expect(item).to.be.eql([])
  })
  it('retorna um objeto com a venda', async function () {
    const dbItem = [[{
      id: 1,
      date: '2022 - 07 - 06 19: 32: 25',
    }]]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await salesModel.getId(1)

    expect(item).to.be.eql(1)
  })
  it('chama a função de deletar um item', async function () {
    const sql = `
    DELETE FROM StoreManager.sales
    WHERE id = ?
    `;
    sinon.stub(db, 'query').resolves()
    const item = await salesModel.delete(1)

    expect(db.query.calledWith(sql)).to.be.eql(true)
  })
});