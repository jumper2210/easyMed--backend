const Patient = require('../models/patient');
const Medicine = require('../models/medicine');
const Doctor = require('../models/doctor');
const { validationResult } = require('express-validator');

exports.assignMedicine = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  const patientId = req.params.patientId;
  const medicineName = req.body.medicineName;
  const timeOfTaking = req.body.timeOfTaking;
  const quantity = req.body.quantity;
  const creator = req.userId;

  const medicine = new Medicine({
    name: medicineName,
    timeOfTaking: timeOfTaking,
    quantity: quantity,
    creator: creator,
  });
  try {
    const patient = await Patient.findById(patientId);
    const Medicine = await medicine.save();
    patient.medicines.push(Medicine);
    patient.save();
    const doctor = await Doctor.findById(creator);

    res.status(201).json({
      medicine: medicine,
      assignBy: doctor,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.loadPatientMedicines = async (req, res, next) => {
  const patientId = req.params.patientId;

  try {
    const patient = await Patient.findOne({ _id: patientId }).populate(
      'medicines'
    );
    const medicines = patient.medicines;
    res.status(201).json({ medicines: medicines });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMedicine = async (req, res, next) => {
  const medicineId = req.params.medicineId;
  try {
    await Medicine.findByIdAndRemove(medicineId);

    res.status(200).json({ message: 'Deleted medicine.' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
