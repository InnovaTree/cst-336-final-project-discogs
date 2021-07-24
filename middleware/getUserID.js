const mysql = require('mysql');
const executeSQL = require('./executeSQL');

const getUserID = async function(req){
  let username = req.session.username;
  let sql = 'SELECT userid FROM user WHERE username = ?'
  let params = [username];
  let rows = await executeSQL(sql, params);
  return rows[0].userid;
}

module.exports = getUserID;