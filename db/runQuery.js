const db = require("./connectDb");
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        console.error(query, "\n", err.message);
        return reject(err);
      }
      if (query.startsWith("INSERT")) {
        resolve(this.lastID); // Resolve with the last inserted ID
      } else if (query.startsWith("UPDATE")) {
        resolve(this.changes); // Resolve with the last inserted ID
      }
    });
  });
};

const getOne = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, function (err, row) {
      if (row) {
        resolve(row); // Resolve with the last inserted ID
      } else {
        resolve(undefined);
      }
      if (err) {
        console.error(query, "\n", err.message);
        return reject(err);
      }
    });
  });
};

const getAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, function (err) {
      if (err) {
        console.error(query, "\n", err.message);
        return reject(err);
      }
      resolve(this.lastID); // Resolve with the last inserted ID
    });
  });
};

module.exports = { runQuery, getOne, getAll };
