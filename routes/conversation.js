const express = require('express');
const conversationController = require('../controllers/conversation');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post(
  '/createConversationWithDoctor',
  isAuth,
  conversationController.createConversationWithDoctor
);
router.get(
  '/getConversationsWithDoctors',
  isAuth,
  conversationController.loadConversationsWithDoctors
);
router.post(
  '/createConversationWithPatient',
  isAuth,
  conversationController.createConversationWithPatient
);
router.get(
  '/getConversationsWithPatients',
  isAuth,
  conversationController.loadConversationsWithPatients
);
module.exports = router;
