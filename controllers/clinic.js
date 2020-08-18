const Clinic = require("../models/clinic");
const { validationResult } = require("express-validator");

exports.getClinics = (req, res, next) => {
  Clinic.find()
    .then((clinics) => {
      res.status(200).json({ message: "Fetched clinic", clinics: clinics });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createClinic = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const imageUri = req.body.imageUri;
  const address = req.body.address;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const clinic = new Clinic({
    title: title,
    imageUri: imageUri,
    address: address,
    lat: lat,
    lng: lng,
  });
  clinic
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Clinic created successfully!",
        clinic: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
