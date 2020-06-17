const Clinic = require("../models/clinic");

exports.getClinics = (req, res, next) => {
  res.status(200).json({
    clinics: [
      {
        _id: "1",
        title: "numero uno",
        imageUri: "asd",
        address: "asdasd",
        lat: "asd",
        lng: "asda",
      },
    ],
  });
};

exports.createClinic = (req, res, next) => {
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
    .catch((err) => console.log(err));
};
