const mysql = require("mysql");
const executeSQL = require("./executeSQL");

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
