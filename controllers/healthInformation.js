const HealthInformation = require('../models/healthInformation');
const { validationResult } = require('express-validator');
const Patient = require('../models/patient.js');

exports.createHealthInformation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  let creator;

  const pickedSymptom = req.body.pickedSymptom;
  const otherSymptom = req.body.otherSymptom;
  const age = req.body.age;
  const scale = req.body.scale;
  const increase = req.body.increase;
  const locationOfPain = req.body.locationOfPain;
  const radiance = req.body.radiance;
  const imageUri = req.body.imageUri;

  const healthInformation = new HealthInformation({
    pickedSymptom: pickedSymptom,
    otherSymptom: otherSymptom,
    age: age,
    scale: scale,
    increase: increase,
    locationOfPain: locationOfPain,
    radiance: radiance,
    imageUri: imageUri,
    creator: req.userId,
  });
  healthInformation
    .save()
    .then((result) => {
      return Patient.findById(req.userId);
    })
    .then((patient) => {
      creator = patient;
      patient.healthInformations.push(healthInformation);
      return patient.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'health Information created successfully!',
        healthInformation: healthInformation,
        creator: { _id: creator._id, name: creator.name },
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getHealthInformation = async (req, res, next) => {
  const patientId = req.params.patientId;
  await Patient.findOne({ _id: patientId })
    .populate('healthInformations')
    .then((patient) => {
      if (patient) {
        const healthInformations = patient.healthInformations;
        res.status(200).json({ healthInformations });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.checkhealthInformation = async (req, res, next) => {
  const healthInformationId = req.params.healthInformationId;
  await HealthInformation.findOne({ _id: healthInformationId })
    .then((healthInformation) => {
      if (healthInformation) {
        healthInformation.resolved = true;
        healthInformation.save();
        res.status(200).json({ healthInformation });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
