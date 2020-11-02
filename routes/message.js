const express = require("express");
const messageController = require("../controllers/message");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get(
  "/getMessage/:conversationId",
  isAuth,
  messageController.loadMessages
);

module.exports = router;
