const insertUserQuery = `INSERT INTO users (userName, email, passwd) VALUES (?,?,?)`;
const userExistsQuery = `SELECT * FROM users WHERE userName=? OR email=?`;
// const getUserQuery = `SELECT * FROM users WHERE (userName=? OR email=?) AND passwd=?`;

module.exports = {
  insertUserQuery,
  userExistsQuery,
  // getUserQuery
};
