const mysql = require('mysql');
const executeSQL = require("./executeSQL");

const isPresent = async function(albumID){
  let sql = "SELECT * FROM album WHERE albumid = ?";
  let params = [albumID];
  let rows = await executeSQL(sql, params);
  return rows.length != 0;
}

const addAlbum = async function(albumID, title, image){
  let sql = "INSERT INTO album (albumid, title, image) values(?,?,?)";
  let params = [albumID, title, image];
  let rows = await executeSQL(sql, params);
  return rows;
}

module.exports = { isPresent, addAlbum };