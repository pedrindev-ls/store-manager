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
  async listItems() {
    const sql = `
    SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id;
    `;

    const [table] = await db.query(sql);
    return table;
  },
  async getWithId(id) {
    const sql = `
    SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE s.id = ?;
    `;

    const [table] = await db.query(sql, [id]);
    return table;
  },
};

module.exports = salesProductModel;