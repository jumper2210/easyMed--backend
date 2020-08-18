const Message = require("../models/message");
const ChatGroup = require("../models/chatGroup");
const io = require("../socket");
const { validationResult } = require("express-validator");

exports.createMessage = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const createdBy = req.body.createdBy;
  const text = req.body.text;
  const createdAt = req.body.createdAt;
  const creator = req.body.creatorId;
  const message = new Message({
    createdBy: createdBy,
    createdAt: createdAt,
    text: text,
    creator: creator,
  });

  try {
    await message.save();
    const chatGroup = await ChatGroup.findById(creator);

    chatGroup.messages.push(message);
    await chatGroup.save();

    io.getIO().emit("messages", {
      action: "create",
      message: {
        ...message._doc,
        creator: { _id: req.chatGroupId, groupName: chatGroup.groupName },
      },
    });
    res.status(201).json({
      message: message,
      creator: { _id: chatGroup._id, groupName: chatGroup.groupName },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMessage = async (req, res, next) => {
  const messageId = req.params.messageId;
  const message = await Message.findById(messageId);

  try {
    if (!chatGroup) {
      const error = new Error("Could not fetch message.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: message });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
