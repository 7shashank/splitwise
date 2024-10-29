const express = require("express");

const {
  createGroup,
  groupDetails,
  editName,
  addNewMember,
} = require("../controllers/groups");
const router = express.Router();

router.route("/createGroup").post(createGroup);
router.route("/:groupId").get(groupDetails).patch(editName).patch(addNewMember);
router.route("/:groupId/join").patch(addNewMember);

module.exports = router;
