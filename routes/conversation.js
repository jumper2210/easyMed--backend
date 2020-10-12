const express = require("express");

const conversationController = require("../controllers/conversation");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.post(
  "/createConversation",
  isAuth,
  conversationController.createConversation
);
router.get(
  "/getConversations",
  isAuth,
  conversationController.loadConversations
);
module.exports = router;
