// const ChatGroup = require("../models/chatGroup");
// const { validationResult } = require("express-validator");
// const User = require("../models/user.js");

// exports.createChatGroup = (req, res, next) => {
//   const errors = validationResult(req);
//   let creator;
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation failed");
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }

//   const chatGroup = new ChatGroup({
//     groupName: req.body.groupName,
//     creator: req.userId,
//   });
//   chatGroup
//     .save()
//     .then((result) => {
//       return User.findById(req.userId);
//     })
//     .then((user) => {
//       creator = user;
//       user.chatGroups.push(chatGroup);
//       return user.save();
//     })
//     .then((result) => {
//       res.status(201).json({
//         chatGroup: chatGroup,

//         creator: { _id: creator._id, name: creator.name },
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.getChatGroups = (req, res, next) => {
//   ChatGroup.find()
//     .then((chatGroups) => {
//       res.status(200).json({ chatGroups: chatGroups });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
