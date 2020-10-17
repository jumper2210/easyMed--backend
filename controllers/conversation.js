const User = require("../models/user");
const Conversation = require("../models/conversation");

exports.createConversation = async (req, res, next) => {
  await User.findOne({ _id: req.userId })
    .populate("conversations")
    .then((user) => {
      if (user) {
        const isConversationExist =
          user.conversations.filter(
            (conversation) =>
              conversation.userOneId === req.body.doctorId ||
              conversation.userTwoId === req.body.doctorId
          ).length > 0;
        if (isConversationExist) {
          console.log("You already have conversation with this user");
        } else {
          User.findById(req.body.doctorId).then((doctor) => {
            const newConversation = new Conversation({
              userOneId: user._id,
              userTwoId: doctor._id,
            });
            newConversation.save().then((conversation) => {
              user.conversations.push(conversation);
              user.save();
              doctor.conversations.push(conversation);
              doctor.save();
              res.json({ id: conversation._id, doctorId: doctor._id });
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
exports.loadConversations = async (req, res, next) => {
  await User.findOne({ _id: req.userId })
    .populate("conversations")
    .then((user) => {
      if (user) {
        const conversations = user.conversations.map((conversation) => {
          const doctorId =
            `${user._id}` === conversation.userOneId
              ? conversation.userTwoId
              : conversation.userOneId;
          return {
            id: conversation._id,
            doctorId,
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
