const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};