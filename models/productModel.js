const db = require('./db');

const productModel = {
  async listItems() {
    const sql = `
    SELECT *
    FROM StoreManager.products
    `;

    const [table] = await db.query(sql);
    return table;
  },
  async listItem(id) {
    const sql = `
    SELECT *
    FROM StoreManager.products
    WHERE id = ?
    `;

    const [[table]] = await db.query(sql, [id]);
    return table;
  },
  async exists(id) {
    const sql = `
    SELECT *
    FROM StoreManager.products
    WHERE id = ?
    `;

    const [table] = await db.query(sql, [id]);
    return table;
  },
  async addProduct(name) {
    const sql = `
    INSERT INTO StoreManager.products (name) VALUES 
    (?)
    `;

    const [table] = await db.query(sql, [name]);
    return table.insertId;
  },
};

module.exports = productModel;