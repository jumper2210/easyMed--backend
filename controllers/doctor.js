const Clinic = require('../models/clinic');
const Doctor = require('../models/doctor');

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
