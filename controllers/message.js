const Conversation = require("../models/conversation");

exports.loadMessages = async (req, res, next) => {
  await Conversation.findById(req.params.conversationId)
    .populate("messages")
    .then((conversation) => {
      if (conversation) {
        res.json({ id: conversation._id, messages: conversation.messages });
      } else {
        console.log("Cannot find conversations");
      }
    })
    .catch((err) => console.log(err));
};
