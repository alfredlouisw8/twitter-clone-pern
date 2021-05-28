const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  post: "5432",
  database: "twitter_clone",
});

module.exports = pool;
