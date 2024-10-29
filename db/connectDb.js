const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to DB....");
  }
});

module.exports = db;
