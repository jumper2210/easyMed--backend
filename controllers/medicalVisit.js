const MedicalVisit = require('../models/medicalVisit');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const medicalVisit = require('../models/medicalVisit');

exports.createMedicalVisit = async (req, res, next) => {
  const { day, doctorId, hour } = req.body;
  const _id = req.userId;
  const { dateString } = day;
  try {
    const doctor = await Doctor.findOne({ _id: doctorId });
    const patient = await Patient.findOne({ _id: _id });

    const medicalVisit = new MedicalVisit({
      date: dateString,
      hour: hour,
      patient: patient,
      doctor: doctor,
    });
    medicalVisit
      .save()
      .then(() => {
        doctor.medicalVisits.push(medicalVisit);
        return doctor.save();
      })
      .then(() => {
        patient.medicalVisits.push(medicalVisit);
        return patient.save();
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getMedicalVisit = async (req, res, next) => {};

exports.checkOfDeadlines = async (req, res, next) => {
  const { doctorId, dateString } = req.params;
  let deadlines = [];
  try {
    const doctor = await Doctor.findOne({ _id: doctorId }).populate(
      'medicalVisits'
    );
    if (!doctor) {
      errors.statusCode = 404;
      throw new Error('doctor with this id not be found');
    }
    if (doctor.medicalVisits.length === 0) {
      res.status(200).json({
        deadlines,
      });
    }
  } catch (err) {}
};
