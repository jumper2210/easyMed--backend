const express = require("express");

const messageController = require("../controllers/message");
const router = express.Router();

router.get("/getMessage/:conversationId", messageController.loadMessages);

module.exports = router;
