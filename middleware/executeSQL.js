const mysql = require("mysql");
const pool = require('./dbpool');

const executeSQL = async function(sql, params) {
  result = new Promise((resolve, reject) => {
    pool.query(sql, params, (err, rows, table) => {
      if (err) {
        console.log(`[DB ERROR] ${err.message}`);
      }
      resolve(rows);
    });
  });
  return result;
}

module.exports = executeSQL;