const express = require('express');
const patientController = require('../controllers/patient');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get(
  '/getClinicPatients/:clinicId',
  isAuth,
  patientController.getClinicPatients
);

router.get(
  '/getPatientMedicalVisits',
  isAuth,
  patientController.getPatientMedicalVisits
);

module.exports = router;
