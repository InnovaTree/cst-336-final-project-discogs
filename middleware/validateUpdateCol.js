const mysql = require("mysql");
const executeSQL = require("./executeSQL");

/**
 * Checks if album is present in a user's collection.
 * @param {int} userID userid associated with collection 
 * @param {int} albumID albumid associated with userid and collection
 * @returns {bool} True if present and False if not
 */
const validateUpdateCol = async function (userID, albumID) {
  let sql = "SELECT albumid FROM collection WHERE userid = ?";
  let params = [userID];
  let rows = await executeSQL(sql, params);
  for (const[key, value] of Object.entries(rows)) {
   if(value.albumid == albumID){
     return true;
   }
  }
  return false;
};

module.exports = validateUpdateCol;
