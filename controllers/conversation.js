const Patient = require('../models/patient');
const Conversation = require('../models/conversation');
const Doctor = require('../models/doctor');

exports.createConversationWithDoctor = async (req, res, next) => {
  await Patient.findOne({ _id: req.userId })
    .populate('conversations')
    .then((user) => {
      if (user) {
        const isConversationExist =
          user.conversations.filter(
            (conversation) =>
              conversation.userOneId === req.body.chatMateId ||
              conversation.userTwoId === req.body.chatMateId
          ).length > 0;
        if (isConversationExist) {
          console.log('You already have conversation with this user');
        } else {
          Doctor.findById(req.body.chatMateId).then((chatMate) => {
            const newConversation = new Conversation({
              userOneId: user._id,
              userTwoId: chatMate._id,
            });
            newConversation.save().then((conversation) => {
              user.conversations.push(conversation);
              user.save();
              chatMate.conversations.push(conversation);
              chatMate.save();
              res.json({ id: conversation._id, chatMateId: chatMate._id });
            });
          });
        }
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.loadConversationsWithDoctors = async (req, res, next) => {
  await Patient.findOne({ _id: req.userId })
    .populate('conversations')
    .then((user) => {
      if (user) {
        const conversations = user.conversations.map((conversation) => {
          const chatMateId =
            `${user._id}` === conversation.userOneId
              ? conversation.userTwoId
              : conversation.userOneId;
          return {
            id: conversation._id,
            chatMateId,
          };
        });
        res.status(201).json(conversations);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createConversationWithPatient = async (req, res, next) => {
  await Doctor.findOne({ _id: req.userId })
    .populate('conversations')
    .then((user) => {
      if (user) {
        const isConversationExist =
          user.conversations.filter(
            (conversation) =>
              conversation.userOneId === req.body.chatMateId ||
              conversation.userTwoId === req.body.chatMateId
          ).length > 0;
        if (isConversationExist) {
          console.log('You already have conversation with this user');
        } else {
          Patient.findById(req.body.chatMateId).then((chatMate) => {
            const newConversation = new Conversation({
              userOneId: user._id,
              userTwoId: chatMate._id,
            });
            newConversation.save().then((conversation) => {
              user.conversations.push(conversation);
              user.save();
              chatMate.conversations.push(conversation);
              chatMate.save();
              res.json({ id: conversation._id, chatMateId: chatMate._id });
            });
          });
        }
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.loadConversationsWithPatients = async (req, res, next) => {
  await Doctor.findOne({ _id: req.userId })
    .populate('conversations')
    .then((user) => {
      if (user) {
        const conversations = user.conversations.map((conversation) => {
          const chatMateId =
            `${user._id}` === conversation.userOneId
              ? conversation.userTwoId
              : conversation.userOneId;
          return {
            id: conversation._id,
            chatMateId,
          };
        });
        res.status(201).json(conversations);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
