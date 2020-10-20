const express = require("express");
const chatMatesController = require("../controllers/chatMates");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/getChatMates", isAuth, chatMatesController.getChatMates);
router.post("/addChatMate", chatMatesController.addChatMate);
module.exports = router;
