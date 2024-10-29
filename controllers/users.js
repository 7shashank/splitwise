const { runQuery, getOne } = require("../db/runQuery");
const {
  insertUserQuery,
  userExistsQuery,
  // getUserQuery,
} = require("../dbQueries/userQueries");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const { userName, passwd, email } = req.body;
    const userExists = await getOne(userExistsQuery, [userName, email]);
    console.log(userExists);
    if (!!userExists) {
      return res.status(200).json({
        msg: "User with the given Username or Email already exists",
      });
    }
    const passwdHash = bcrypt.hashSync(passwd, Number(process.env.SALT));
    const newUserId = await runQuery(insertUserQuery, [
      userName,
      email,
      passwdHash,
    ]);
    return res
      .status(200)
      .json({ msg: "New user created successfully", userId: newUserId });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    const { userName, passwd, email } = req.body;
    const user = await getOne(userExistsQuery, [userName || "", email || ""]);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        msg: "Username or email wrong. Try again...",
      });
    } else if (!(await bcrypt.compare(passwd, user.passwd))) {
      return res.status(401).json({
        msg: "Password wrong. Try again...",
      });
    }
    return res.status(200).json({
      msg: "User login successful",
      user: { email: user.email, userName: user.userName, id: user.id },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { createUser, getUser };
