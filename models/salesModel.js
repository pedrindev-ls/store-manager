const db = require('./db');

const salesModel = {
  async add() {
    const sql = `
    INSERT INTO StoreManager.sales (date) VALUES 
    (NOW())
    `;

    const [table] = await db.query(sql);
    return table.insertId;
  },
  async existSale(id) {
    const sql = `
    SELECT *
    FROM StoreManager.sales
    WHERE id = ?
    `;

    const [table] = await db.query(sql, [id]);
    return table;
  },
  async getId(id) {
    const sql = `
    SELECT *
    FROM StoreManager.sales
    WHERE id = ?
    `;

    const [[table]] = await db.query(sql, [id]);
    return table.id;
  },
  async delete(id) {
    const sql = `
    DELETE FROM StoreManager.sales
    WHERE id = ?
    `;

    await db.query(sql, [id]);
  },
};

module.exports = salesModel;