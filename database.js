const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AXE13a0bAo',
  database: 'myPortfolioDB', //This must be Active in Workbench
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');

  // Run a test query
  connection.query('SELECT * FROM User', (err, results) => {
    if (err) {
      console.error('Query error:', err);
    } else {
      console.log('User table rows:', results);
    }
    connection.end();
  });
});
