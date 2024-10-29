const db = require("./connectDb");

const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        console.error(query, "\n", err.message);
        return reject(err);
      }
      resolve(true); // Resolve with the last inserted ID
    });
  });
};

const createUsersSql = `CREATE TABLE IF NOT EXISTS 'users' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    passwd TEXT NOT NULL
)`;

const createGroupsSql = `CREATE TABLE IF NOT EXISTS 'groups' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ownerId INTEGER NOT NULL,
    passwd TEXT NOT NULL,
    name TEXT NOT NULL,
    memberIds BLOB NOT NULL
)`;

const setupDB = async () => {
  try {
    const usersTableCreated = await runQuery(createUsersSql);
    if (usersTableCreated) {
      const groupsTableCreated = await runQuery(createGroupsSql);
      return groupsTableCreated ? true : false;
    }
  } catch (error) {
    console.log("Error while setting up DB.");
    throw error;
  }
};

module.exports = setupDB;
