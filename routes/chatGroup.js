const express = require("express");

const chatGroupController = require("../controllers/chatGroup");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.post("/createChatGroup", isAuth, chatGroupController.createChatGroup);

router.get("/fetchChatGroups", chatGroupController.getChatGroups);

module.exports = router;
