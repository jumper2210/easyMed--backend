const MedicalVisit = require('../models/medicalVisit');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

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
    if (doctor.medicalVisits.length > 0) {
      doctor.medicalVisits.map((mv) => {
        if (mv.date == dateString) {
          deadlines.push(mv.hour);
        }
        res.status(200).json({
          deadlines,
        });
      });
    }

    if (doctor.medicalVisits.length === 0) {
      res.status(200).json({
        deadlines,
      });
    }
  } catch (err) {}
};
exports.deletePatientMedicalVisit = (req, res, next) => {
  const { medicalVisitId, doctorId } = req.params;
  MedicalVisit.findByIdAndRemove(medicalVisitId)
    .then(() => {
      return Patient.findById(req.userId);
    })
    .then((patient) => {
      patient.medicalVisits.pull(medicalVisitId);
      return patient.save();
    })
    .then(() => {
      return Doctor.findById(doctorId);
    })
    .then((doctor) => {
      doctor.medicalVisits.pull(medicalVisitId);
      return doctor.save();
    })
    .then(() => {
      res.status(202).json({ message: 'Sukces!' });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteDoctorMedicalVisit = (req, res, next) => {
  const { medicalVisitId, patientId } = req.params;
  MedicalVisit.findByIdAndRemove(medicalVisitId)
    .then(() => {
      return Doctor.findById(req.userId);
    })
    .then((doctor) => {
      doctor.medicalVisits.pull(medicalVisitId);
      return doctor.save();
    })
    .then(() => {
      return Patient.findById(patientId);
    })
    .then((patient) => {
      patient.medicalVisits.pull(medicalVisitId);
      return patient.save();
    })
    .then(() => {
      res.status(202).json({ message: 'Sukces!' });
    })
    .catch((err) => {
      console.log(err);
    });
};
