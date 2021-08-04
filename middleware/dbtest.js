const mysql = require("mysql");
const pool = require("./dbpool");
const executeSQL = require("./executeSQL");

/**
 * Used for troubleshooting. Displays success message
 * if server can connect to database and failure if
 * not.
 */
async function dbTest() {
  let sql = "SELECT CURDATE()";
  let rows = await executeSQL(sql);
  console.log(`DB Connection: ${rows ? "Success" : "Failure"}`);
}

module.exports = dbTest;
