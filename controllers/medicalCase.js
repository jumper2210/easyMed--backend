const MedicalCase = require("../models/medicalCase");
const { validationResult } = require("express-validator");
const User = require("../models/user.js");

exports.createMedicalCase = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
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

  const medicalCase = new MedicalCase({
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

  medicalCase
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.medicalCases.push(medicalCase);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "medicalCase created successfully!",
        medicalCase: medicalCase,
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
