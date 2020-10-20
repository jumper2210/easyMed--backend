const User = require("../models/user");

exports.getChatMates = async (req, res, next) => {
  await User.findOne({ _id: req.userId })
    .populate("chatMates", "name")
    .then((user) => {
      if (user) {
        const chatMates = user.chatMates;
        res.status(200).json({ chatMates });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.addChatMate = async (req, res, next) => {
  const ownEmail = req.body.ownEmail;
  const chatMateEmail = req.body.chatMateEmail;
  if (ownEmail !== chatMateEmail) {
    await User.findOne({ email: ownEmail }).then((user) => {
      if (user) {
        User.findOne({ email: chatMateEmail }).then((chatMate) => {
          if (chatMate) {
            const stringId = `${chatMate._id}`;
            const chatMateExists =
              user.chatMates.filter((d) => `${d}` === stringId).length > 0;
            if (!chatMateExists) {
              user.chatMates.push(chatMate);
              user.save();

              res.status(201).json({
                chatMate: { name: chatMate.name, _id: chatMate._id },
              });
            } else {
              console.log("You have added already this chat mate");
            }
          } else {
            console.log(`chat mate ${req.body.chatMateEmail} doesn't exist`);
          }
        });
      } else {
        console.log("Cannot find user");
      }
    });
  } else {
    console.log("Cannot add yourself as a chat mate");
  }
};
