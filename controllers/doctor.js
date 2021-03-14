const Clinic = require('../models/clinic');
const Doctor = require('../models/doctor');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../env');
const expireTime = 3600000;

exports.getClinicDoctors = async (req, res, next) => {
  const { clinicId } = req.params;
  await Clinic.findById(clinicId)
    .populate('doctors')
    .then((result) => {
      res.status(200).json({ doctors: result.doctors });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getDoctorMedicalVisits = async (req, res, next) => {
  const { userId } = req;
  await Doctor.findById(userId)
    .populate('medicalVisits')
    .then((result) => {
      res.status(200).json({ doctorMedicalVisits: result.medicalVisits });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editPassword = async (req, res, next) => {
  const { userId } = req;
  const errors = validationResult(req);
  const newPassword = req.body.password;
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const doctor = await Doctor.findOne({ _id: userId });

  bcrypt
    .hash(newPassword, 12)
    .then((hashedPw) => {
      doctor.password = hashedPw;
      return doctor.save();
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

      res.status(200).json({
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
