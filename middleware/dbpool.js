const mysql = require('mysql');

/**
 * Creates connection pool with Heroku database. Attributes
 * are store in environment variables.
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

module.exports = pool;