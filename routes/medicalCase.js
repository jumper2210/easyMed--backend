const express = require("express");
const medicalCaseController = require("../controllers/medicalCase");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const { ROLES } = require("../helpers/_roles");
const { authRole } = require("../helpers/_authRole");

router.post(
  "/createMedicalCase",
  isAuth,
  authRole(ROLES.PATIENT),
  medicalCaseController.createMedicalCase
);

router.get(
  "/getPatientMedicalCases/:patientId",
  isAuth,
  medicalCaseController.getPatientMedicalCases
);

router.put(
  "/checkPatientMedicalCase/:medicalCaseId",
  isAuth,
  authRole(ROLES.DOCTOR),
  medicalCaseController.checkPatientMedicalCase
);

module.exports = router;
