const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AXE13a0bAo',
  database: 'myPortfolioDB'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting:', err);
    return;
  }
  console.log('Connected to MySQL!');
});
