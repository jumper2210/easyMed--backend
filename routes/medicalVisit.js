const express = require('express');
const medicalVisitController = require('../controllers/medicalVisit');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post(
  '/createMedicalVisit',
  isAuth,
  medicalVisitController.createMedicalVisit
);

router.get(
  '/checkOfDeadlines/:doctorId/:dateString',
  isAuth,
  medicalVisitController.checkOfDeadlines
);
router.delete(
  '/deletePatientMedicalVisit/:medicalVisitId/:doctorId',
  isAuth,
  medicalVisitController.deletePatientMedicalVisit
);
router.delete(
  '/deleteDoctorMedicalVisit/:medicalVisitId/:patientId',
  isAuth,
  medicalVisitController.deleteDoctorMedicalVisit
);
module.exports = router;
