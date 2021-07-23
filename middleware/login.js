const bcrypt = require("bcrypt");
const executeSQL = require("./executeSQL");
const mysql = require("mysql");

const login = async function (req) {
  if(req.body.authenticated){
    return [true, "User already logged on."];
  }

  let sql = "SELECT password FROM user WHERE username = ?";
  let params = [req.body.username];
  let rows = await executeSQL(sql, params);

  if (rows.length == 0) {
    return [false, "User not found."];
  }

  let passwordMatch = await bcrypt.compare(req.body.password, rows[0].password);
  let message = passwordMatch ? "" : "Password incorrect.";
  return [passwordMatch, message];
};

module.exports = login;
