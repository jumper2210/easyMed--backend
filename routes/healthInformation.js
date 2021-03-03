const express = require('express');
const healthInformationController = require('../controllers/healthInformation');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
const { ROLES } = require('../helpers/_roles');
const { authRole } = require('../helpers/_authRole');

router.post(
  '/createHealthInformation',
  isAuth,
  authRole(ROLES.PATIENT),
  healthInformationController.createHealthInformation
);

router.get(
  '/getPatientHealthInformations/:patientId',
  isAuth,
  healthInformationController.getHealthInformation
);

router.put(
  '/checkPatientHealthInformation/:healthInformationId',
  isAuth,
  authRole(ROLES.DOCTOR),
  healthInformationController.checkhealthInformation
);

module.exports = router;
