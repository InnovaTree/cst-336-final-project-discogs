const mysql = require('mysql');
const executeSQL = require("./executeSQL");

/**
 * Checks to see if albumid is present in the album
 * table.
 * @param {int} albumID ID of album to be found in table
 * @returns {bool} True if album exists and False otherwise
 */
const isPresent = async function(albumID){
  let sql = "SELECT * FROM album WHERE albumid = ?";
  let params = [albumID];
  let rows = await executeSQL(sql, params);
  return rows.length != 0;
}

/**
 * Inserts record containing albumid, title and imageurl into
 * the album table.
 * @param {int} albumID ID of album to be inserted
 * @param {string} title Title of album to be inserted
 * @param {string} image URL of image to be inserted
 * @returns {object} Result of insert operation
 */
const addAlbum = async function(albumID, title, image){
  let sql = "INSERT INTO album (albumid, title, image) values(?,?,?)";
  let params = [albumID, title, image];
  let rows = await executeSQL(sql, params);
  return rows;
}

module.exports = { isPresent, addAlbum };