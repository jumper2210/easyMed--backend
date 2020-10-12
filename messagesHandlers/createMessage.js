const Conversation = require("../models/conversation");
const Message = require("../models/message");

exports.createMessage = (message) => {
  Conversation.findById(message.conversationId).then((conversation) => {
    console.log(conversation);
    const textMessage = new Message({
      text: message.text,
      userId: message.senderId,
    });

    textMessage
      .save()
      .then((savedMessage) => {
        console.log(savedMessage);
        conversation.messages.push(savedMessage);
        conversation.save();
      })
      .catch((err) => console.log(err));
  });
};
