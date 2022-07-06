const sinon = require('sinon');
const chai = require('chai');
const salesProductModel = require('../../../models/salesProductModel');
const { expect } = require('chai');
const db = require('../../../models/db')

describe('testando se o model das vendas e produtos', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('chama a funçõa de adicionar os itens na tabela', async function () {
    const buys = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
    const sql = `
    INSERT INTO StoreManager.sales_products VALUES
    (?)
    `;
    sinon.stub(db, 'query').resolves()
    await salesProductModel.add(3, buys)

    expect(db.query.calledWith(sql)).to.be.eql(true)
  })
  it('lista todos os intens juntando com a tabela de vendas', async function () {
    const dbItem = [[
      {
        "saleId": 1,
        "productId": 1,
        "date": "2022-07-06T20:15:28.000Z",
        "quantity": 5
      },
      {
        "saleId": 1,
        "productId": 2,
        "date": "2022-07-06T20:15:28.000Z",
        "quantity": 10
      },
      {
        "saleId": 2,
        "productId": 3,
        "date": "2022-07-06T20:15:28.000Z",
        "quantity": 15
      },
      {
        "saleId": 3,
        "productId": 1,
        "date": "2022-07-06T20:15:28.000Z",
        "quantity": 1
      }
    ]]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await salesProductModel.listItems()

    expect(item).to.be.eql(dbItem[0])
  })
  it('lista vendas especificas de um id', async function () {
    const dbItem = [[{
      "saleId": 1,
      "productId": 1,
      "date": "2022-07-06T20:15:28.000Z",
      "quantity": 5
    },
      {
        "saleId": 1,
        "productId": 2,
        "date": "2022-07-06T20:15:28.000Z",
        "quantity": 10
      },
    ]]
    sinon.stub(db, 'query').resolves(dbItem)
    const item = await salesProductModel.getWithId(1)

    expect(item).to.be.eql(dbItem[0])
  })
  it('chama a função de deletar alguma venda', async function () {
    const sql = `
    DELETE FROM StoreManager.sales_products
    WHERE sale_id = ?
    `;
    sinon.stub(db, 'query').resolves()
    await salesProductModel.delete(1)

    expect(db.query.calledWith(sql)).to.be.eql(true)
  })
});