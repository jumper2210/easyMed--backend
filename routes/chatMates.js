const express = require('express');
const chatMatesController = require('../controllers/chatMates');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/getChatMates', isAuth, chatMatesController.getChatMates);
router.post(
  '/addChatMateForDoctor',
  isAuth,
  chatMatesController.addChatMateForDoctor
);
router.post(
  '/addChatMateForPatient',
  isAuth,
  chatMatesController.addChatMateForPatient
);
module.exports = router;
