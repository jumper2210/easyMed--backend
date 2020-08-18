const express = require("express");

const messageController = require("../controllers/message");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/createMessage", messageController.createMessage);

router.get("/getMessage", messageController.getMessage);

module.exports = router;
