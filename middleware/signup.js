const bcrypt = require('bcrypt');
const executeSQL = require('./executeSQL');
const mysql = require("mysql");

const saltRounds = 10;

const signUp = async function (req) {
  const { fname, lname, email, username, password } = req.body;

  let hashedPass = await bcrypt.hash(password, saltRounds);

  let sql = `
    INSERT INTO user (fname, lname, email, username, password) 
      VALUES (?, ?, ?, ?, ?)`;
  let params = [fname, lname, email, username, hashedPass];
  let rows = await executeSQL(sql, params);
  return rows ? true : false;
};

module.exports = signUp;
