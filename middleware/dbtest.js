const mysql = require("mysql");
const pool = require("./dbpool");
const executeSQL = require("./executeSQL");

async function dbTest() {
  let sql = "SELECT CURDATE()";
  let rows = await executeSQL(sql);
  console.log(`DB Connection: ${rows ? "Success" : "Failure"}`);
}

module.exports = dbTest;
