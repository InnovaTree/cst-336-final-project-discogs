const bcrypt = require('bcrypt');
const executeSQL = require('./executeSQL');
const mysql = require("mysql");

const saltRounds = 10;

/**
 * Takes parameters present in the body and inserts them into
 * the user table under a new user record. The password is
 * hashed with bcrypt and only the hash is stored.
 * @param {*} req 
 * @returns {object} Response indicating (among other things)
 * number of affect rows
 */
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
