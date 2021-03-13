const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

exports.getChatMates = async (req, res, next) => {
  let chatMates;
  try {
    const patient = await Patient.findOne({ _id: req.userId }).populate(
      'chatMates'
    );
    const doctor = await Doctor.findOne({ _id: req.userId }).populate(
      'chatMates'
    );
    if (doctor) {
      chatMates = doctor.chatMates;
      res.status(200).json({ chatMates });
    } else if (patient) {
      chatMates = patient.chatMates;
      res.status(200).json({ chatMates });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.addChatMateForPatient = async (req, res, next) => {
  const { chatMateEmail, ownEmail } = req.body;
  try {
    const doctor = await Doctor.findOne({ email: chatMateEmail });
    await Patient.findOne({ email: ownEmail }).then((patient) => {
      if (patient) {
        const doctorId = `${doctor._id}`;

        const chatMateExists =
          patient.chatMates.filter((c) => `${c}` === doctorId).length > 0;

        if (!chatMateExists) {
          patient.chatMates.push(doctor);
          patient.save();
          res.status(201).json({
            chatMate: { name: doctor.name, _id: doctor._id },
          });
        } else {
          console.log('You have added already this chat mate');
        }
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addChatMateForDoctor = async (req, res, next) => {
  const { chatMateEmail, ownEmail } = req.body;
  try {
    const patient = await Patient.findOne({ email: chatMateEmail });
    await Doctor.findOne({ email: ownEmail }).then((doctor) => {
      if (patient) {
        const patientId = `${patient._id}`;

        const chatMateExists =
          doctor.chatMates.filter((c) => `${c}` === patientId).length > 0;

        if (!chatMateExists) {
          doctor.chatMates.push(patient);
          doctor.save();
          res.status(201).json({
            chatMate: { name: patient.name, _id: patient._id },
          });
        } else {
          console.log('You have added already this chat mate');
        }
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
