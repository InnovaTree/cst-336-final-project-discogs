const mysql = require("mysql");
const pool = require('./dbpool');

/**
 * Executes query to MySQL database.
 * @param {string} sql SQL command to be run
 * @param {string} params SQL parameters to be injected
 * @returns 
 */
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