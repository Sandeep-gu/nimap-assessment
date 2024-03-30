const conn = require("../db.js");

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = query;
