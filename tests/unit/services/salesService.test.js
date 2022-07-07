const sinon = require('sinon');
const chai = require('chai');
const salesService = require('../../../services/salesService');
const { expect } = require('chai');
const salesProductModel = require('../../../models/salesProductModel');

describe('testando se o Service dos Produtos', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('retorna uma lista de vendas', async function () {
    const dbItems = [
      {
        "sale_id": 1,
        "product_id": 1,
        "date": "2022-07-07T22:56:45.000Z",
        "quantity": 5
      },
      {
        "sale_id": 1,
        "product_id": 2,
        "date": "2022-07-07T22:56:45.000Z",
        "quantity": 10
      },
      {
        "sale_id": 2,
        "product_id": 3,
        "date": "2022-07-07T22:56:45.000Z",
        "quantity": 15
      }
    ]

    const response = [
      {
        "saleId": 1,
        "productId": 1,
        "date": "2022-07-07T22:56:45.000Z",
        "quantity": 5
      },
      {
        "saleId": 1,
        "productId": 2,
        "date": "2022-07-07T22:56:45.000Z",
        "quantity": 10
      },
      {
        "saleId": 2,
        "productId": 3,
        "date": "2022-07-07T22:56:45.000Z",
        "quantity": 15
      }
    ]

    sinon.stub(salesProductModel, 'listItems').resolves(dbItems)

    const item = await salesService.get()

    expect(item).to.be.eql(response)
  })
})