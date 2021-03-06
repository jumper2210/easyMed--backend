const express = require('express');
const medicalVisitController = require('../controllers/medicalVisit');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post(
  '/createMedicalVisit',
  isAuth,
  medicalVisitController.createMedicalVisit
);

router.get('/getMedicalVisit', isAuth, medicalVisitController.getMedicalVisit);

router.get(
  '/checkOfDeadlines/:doctorId/:dateString',
  isAuth,
  medicalVisitController.checkOfDeadlines
);

module.exports = router;
