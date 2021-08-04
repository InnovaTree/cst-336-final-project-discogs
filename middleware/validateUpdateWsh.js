const mysql = require("mysql");
const executeSQL = require("./executeSQL");

/**
 * Checks to see if album is present in the wishlist of a 
 * given user.
 * @param {int} userID userID associated with wishlist
 * @param {int} albumID albumID associated with userID and wishlist
 * @returns {bool} True if album is present and False otherwise
 */
const validateUpdateWsh = async function (userID, albumID) {
  let sql = "SELECT albumid FROM wishlist WHERE userid = ?";
  let params = [userID];
  let rows = await executeSQL(sql, params);
  for (const[key, value] of Object.entries(rows)) {
   if(value.albumid == albumID){
     return true;
   }
  }
  return false;
};

module.exports = validateUpdateWsh;
