const Clinic = require('../models/clinic');

exports.getClinicPatients = async (req, res, next) => {
  const { clinicId } = req.params;
  await Clinic.findOne({ _id: clinicId })
    .populate('patients')
    .then((result) => {
      console.log(result);
      res.status(200).json({ patients: result.patients });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
