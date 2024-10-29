const express = require("express");

const { createUser, getUser } = require("../controllers/users");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("hello");
});

router.route("/signup").post(createUser);
router.route("/login").get(getUser);
// router.route('/').get(getAllTasks).post(createTask);
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
