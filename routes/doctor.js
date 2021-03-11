const express = require('express');
const doctorController = require('../controllers/doctor');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get(
  '/getClinicDoctors/:clinicId',
  isAuth,
  doctorController.getClinicDoctors
);

router.get(
  '/getDoctorMedicalVisits',
  isAuth,
  doctorController.getDoctorMedicalVisits
);

module.exports = router;
