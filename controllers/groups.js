const { runQuery, getOne } = require("../db/runQuery");
const {
  insertGroupQuery,
  getGroupQuery,
  updateGroupNameQuery,
  addMemberQuery,
} = require("../dbQueries/groupQueries");
const { bufferToArray, arrayToBuffer } = require("../helpers");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createGroup = async (req, res) => {
  try {
    const { ownerId, passwd, name } = req.body;
    const passwdHash = bcrypt.hashSync(passwd, Number(process.env.SALT));
    const memberIdsBuffer = arrayToBuffer([ownerId]);
    const newGroupId = await runQuery(insertGroupQuery, [
      ownerId,
      passwdHash,
      name,
      memberIdsBuffer,
    ]);
    return res.status(200).json({
      msg: "New group created successfully",
      group: {
        id: newGroupId,
        name: name,
      },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const groupDetails = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.body.userId;
    const groupDetails = await getOne(getGroupQuery, [groupId]);
    if (!groupDetails) {
      return res.status(404).json({
        msg: "Group doesn't exist.",
      });
    } else {
      const memberIds = bufferToArray(groupDetails.memberIds);
      groupDetails.memberIds = memberIds;
      if (!groupDetails.memberIds.includes(userId)) {
        return res.status(404).json({
          msg: "Group doesn't exist.",
        });
      }
    }
    const { passwd, ...returnDetails } = groupDetails;
    // TODO: Fetch and return expenses as well.
    return res.status(200).json({
      msg: "Group details",
      group: {
        ...returnDetails,
      },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const editName = async (req, res) => {
  try {
    const { newName } = req.body;
    const groupId = req.params.groupId;
    const groupUpdated = await runQuery(updateGroupNameQuery, [
      newName,
      groupId,
    ]);
    if (!groupUpdated) {
      return res.status(404).json({ msg: `Group doesn't exist.` });
    }
    return res.status(200).json({
      msg: "Group name updated successfully",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const addNewMember = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { userId, groupPasswd } = req.body;
    const groupDetails = await getOne(getGroupQuery, [groupId]);

    if (!groupDetails) {
      return res.status(401).json({
        msg: "Group doesn't exist.",
      });
    } else if (!(await bcrypt.compare(groupPasswd, groupDetails.passwd))) {
      return res.status(401).json({
        msg: "Password wrong. Try again...",
      });
    }

    const memberIds = bufferToArray(groupDetails.memberIds);
    if (memberIds.includes(userId)) {
      return res.status(400).json({ msg: "Already a member of the Group." });
    }
    memberIds.push(userId);

    const memberIdsBuffer = arrayToBuffer(memberIds);
    const groupMembersUpdated = await runQuery(addMemberQuery, [
      memberIdsBuffer,
      groupId,
    ]);
    if (!groupMembersUpdated) {
      return res
        .status(500)
        .json({ msg: `Group update failed. Something went wrong.` });
    }
    return res.status(200).json({
      msg: "Joined group successfully",
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  createGroup,
  groupDetails,
  addNewMember,
  editName,
};
