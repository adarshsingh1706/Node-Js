const express = require("express");
const router = express.Router();
const {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

//Routes

router.get("/", handleAllUsers);

//to get info of an id

router.get("/:id", handleGetUserById);

//to post info

router.post("/", handleCreateNewUser);

//editing using patch

router.patch("/:id", handleUpdateUserById);

//for deleting user
router.delete("/:id", handleDeleteUserById);

module.exports = router;
