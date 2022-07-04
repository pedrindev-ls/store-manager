const db = require('./db');

const salesModel = {
  async listItems() {
    const sql = `
    SELECT *
    FROM StoreManager.sales
    `;

    const [table] = await db.query(sql);
    return table;
  },
  async add() {
    const sql = `
    INSERT INTO StoreManager.sales (date) VALUES 
    (NOW())
    `;

    const [table] = await db.query(sql);
    return table.insertId;
  },
};

module.exports = salesModel;