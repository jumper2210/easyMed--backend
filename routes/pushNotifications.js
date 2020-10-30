const express = require("express");

const router = express.Router();

const pushNotificationsController = require("../controllers/pushNotifications");

router.post("/token", pushNotificationsController.saveTokenHandler);

router.post("/message", pushNotificationsController.messageTokenHandler);

module.exports = router;
