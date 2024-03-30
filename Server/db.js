const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "nimap_crud",
});

module.exports = conn;
