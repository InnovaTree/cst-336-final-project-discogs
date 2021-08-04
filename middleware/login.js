const bcrypt = require("bcrypt");
const executeSQL = require("./executeSQL");
const mysql = require("mysql");

/**
 * Uses bcrypt to hash password provided in req.body and
 * compare it to the hashed password stored in the database.
 * @param {*} req 
 * @returns {array} [{bool} login succeeded, {string} result message]
 */
const login = async function (req) {

  // Returns if user is already logged on
  if(req.body.authenticated){
    return [true, "User already logged on."];
  }

  let sql = "SELECT password FROM user WHERE username = ?";
  let params = [req.body.username];
  let rows = await executeSQL(sql, params);

  // Returns false if username is not present in user table
  if (rows.length == 0) {
    return [false, "User not found."];
  }

  // Returns true if hashed passwords match or false otherwise
  let passwordMatch = await bcrypt.compare(req.body.password, rows[0].password);
  let message = passwordMatch ? "" : "Password incorrect.";
  return [passwordMatch, message];
};

module.exports = login;
