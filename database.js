const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', //my SQL username (dun forget)
  password: 'AXE13a0bAo', //This is my SQL pw (dun forget)
  database: 'myPortfolioDB', //This must be Active in Workbench
  port: 3306
});
//no db.connect().... pool will manages these connections auto..
module.exports = db;
