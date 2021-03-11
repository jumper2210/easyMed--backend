const Clinic = require('../models/clinic');
const Patient = require('../models/patient');

exports.getClinicPatients = async (req, res, next) => {
  const { clinicId } = req.params;
  await Clinic.findById(clinicId)
    .populate('patients')
    .then((result) => {
      res.status(200).json({ patients: result.patients });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getPatientMedicalVisits = async (req, res, next) => {
  const { userId } = req;
  await Patient.findById(userId)
    .populate('medicalVisits')
    .then((result) => {
      res.status(200).json({ patientMedicalVisits: result.medicalVisits });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
