const { Pool } = require('pg');

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydb',
  password: 'Nurs.2002',
  port: 5432,
});

module.exports = pool; 