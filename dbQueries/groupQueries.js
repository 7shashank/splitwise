const insertGroupQuery = `INSERT INTO groups (ownerId, passwd, name, memberIds) VALUES (?,?,?,?)`;
const getGroupQuery = `SELECT * FROM groups WHERE id=?`;
const updateGroupNameQuery = `UPDATE groups SET name = ? WHERE id = ?;`;
const addMemberQuery = `UPDATE groups SET memberIds = ? WHERE id = ?;`;
// const getUserQuery = `SELECT * FROM users WHERE (userName=? OR email=?) AND passwd=?`;

module.exports = {
  insertGroupQuery,
  getGroupQuery,
  updateGroupNameQuery,
  addMemberQuery,
};
