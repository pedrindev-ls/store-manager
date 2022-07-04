const db = require('./db');

const salesProductModel = {
  async add(saleId, sales) {
    const sql = `
    INSERT INTO StoreManager.sales_products VALUES
    (?)
    `;
    const itemsToAdd = sales.map(({ productId, quantity }) => [saleId, productId, quantity]);
    
    const [table] = await db.query(sql, itemsToAdd);
    console.log(table);
  },
};

module.exports = salesProductModel;