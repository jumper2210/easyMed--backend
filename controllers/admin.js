const { validationResult } = require('express-validator');
const Doctor = require('../models/doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../env.js');
const Clinic = require('../models/clinic');

exports.assignDoctorAccount = async (req, res, next) => {
  const errors = validationResult(req);
  const expireTime = 3600000;

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, name, password, specialization, clinicId } = req.body;
  const clinic = await Clinic.findOne({ _id: clinicId });

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const doctor = new Doctor({
        email: email,
        password: hashedPw,
        name: name,
        specialization: specialization,
        isAssignClinic: true,
        clinics: clinic,
      });
      return doctor.save();
    })

    .then((result) => {
      clinic.doctors.push(result);
      clinic.save();
      const token = jwt.sign(
        {
          email: result.email,
          userId: result._id.toString(),
          role: result.role,
          isAssignClinic: true,
        },
        ENV.keys.tokenSecret,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        userId: result._id,
        token: token,
        expireTime,
        role: result.role,
        isAssignClinic: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
