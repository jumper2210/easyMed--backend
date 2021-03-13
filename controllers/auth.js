const { validationResult } = require('express-validator');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../env');

const expireTime = 3600000;

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const patient = new Patient({
        email: email,
        password: hashedPw,
        name: name,
      });
      return patient.save();
    })

    .then((result) => {
      const token = jwt.sign(
        {
          email: result.email,
          userId: result._id.toString(),
          role: result.role,
          isAssignClinic: result.isAssignClinic,
        },
        ENV.keys.tokenSecret,
        { expiresIn: expireTime }
      );

      res.status(201).json({
        userId: result._id,
        token: token,
        expireTime: expireTime,
        role: result.role,
        isAssignClinic: result.isAssignClinic,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  let loadedUser;

  try {
    const user =
      (await Patient.findOne({ email: email })) ||
      (await Doctor.findOne({ email: email }));

    if (!user) {
      const error = new Error('A user with this email could not be found');
      error.statusCode = 401;
      throw error;
    }

    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('A user with this password could not be found');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.getMaxListeners,
        userId: loadedUser._id.toString(),
        role: loadedUser.role,
        isAssignClinic: loadedUser.isAssignClinic,
      },
      ENV.keys.tokenSecret,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      name: name,
      expireTime,
      role: loadedUser.role,
      isAssignClinic: loadedUser.isAssignClinic,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
