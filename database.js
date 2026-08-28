const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

  //host: 'localhost',
  //user: 'root', my SQL username (dun forget)
  //password: 'AXE13a0bAo', This is my SQL pw (dun forget)
  //database: 'myPortfolioDB', This must be Active in Workbench
});

//no db.connect().... pool will manages these connections auto..
module.exports = db;
