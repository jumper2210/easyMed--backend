const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

exports.getChatMates = async (req, res, next) => {
  (await Patient.findOne({ _id: req.userId })) ||
    (await Doctor.findOne({ _id: req.userId }))
      .populate('chatMates', 'name')
      .then((userRes) => {
        console.log(userRes);
        if (userRes) {
          const chatMates = userRes.chatMates;
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
    (await Patient.findOne({ email: ownEmail })) ||
      (await Doctor.findOne({ email: ownEmail })).then((userRes) => {
        if (userRes) {
          User.findOne({ email: chatMateEmail }).then((chatMate) => {
            if (chatMate) {
              const stringId = `${chatMate._id}`;
              const chatMateExists =
                user.chatMates.filter((d) => `${d}` === stringId).length > 0;
              if (!chatMateExists) {
                userRes.chatMates.push(chatMate);
                userRes.save();

                res.status(201).json({
                  chatMate: { name: chatMate.name, _id: chatMate._id },
                });
              } else {
                console.log('You have added already this chat mate');
              }
            } else {
              console.log(`chat mate ${req.body.chatMateEmail} doesn't exist`);
            }
          });
        } else {
          console.log('Cannot find user');
        }
      });
  } else {
    console.log('Cannot add yourself as a chat mate');
  }
};
