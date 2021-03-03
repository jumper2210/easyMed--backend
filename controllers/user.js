const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const { validationResult } = require('express-validator');

exports.getUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user =
      (await Patient.findOne({ _id: userId })) ||
      (await Doctor.findOne({ _id: userId }));

    if (!user) {
      const error = new Error('User could not be found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editUser = async (req, res, next) => {
  const { userId } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const avatar = req.body.selectedImage;
  const phoneNumber = req.body.phoneNumber;
  // const password = req.body.password
  try {
    const user =
      (await Patient.findOne({ _id: userId })) ||
      (await Doctor.findOne({ _id: userId }));

    if (!user) {
      errors.statusCode = 404;
      throw new Error('user could not be found');
    }

    user.name = name;
    user.avatar = avatar;
    user.phoneNumber = phoneNumber;
    user.password = password;

    // bcrypt.hash(password, 12).then((hashedPw) => {
    //   const doctor = new Doctor({
    //     password: hashedPw,
    //   })
    //   return doctor.save()
    // })

    res.status(200).json({
      user: user,
    });
    return user.save();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 200;
    }
    next(err);
  }
};
