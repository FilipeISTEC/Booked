const mysql = require('mysql2');

// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'mysql-db-booked-db-booked.a.aivencloud.com',
  port: '22962',
  user: 'avnadmin',
  password: 'AVNS_RPhw_BkpHf9EOr_l2sK',
  database: 'db-booked',
  connectTimeout: 3000
});
// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// close the MySQL connection
connection.end();