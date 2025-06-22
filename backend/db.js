const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'monthdayyear1Y',
  database: 'ues_stationbook',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for use in other files
module.exports = pool.promise(); // Use `.promise()` for async/await syntax
