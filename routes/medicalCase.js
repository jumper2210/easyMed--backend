const express = require("express");
const medicalCaseController = require("../controllers/medicalCase");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post(
  "/createMedicalCase",
  isAuth,
  medicalCaseController.createMedicalCase
);

router.get(
  "/getPatientMedicalCases/:patientId",
  medicalCaseController.getPatientMedicalCases
);

router.put(
  "/checkPatientMedicalCase/:medicalCaseId",
  medicalCaseController.checkPatientMedicalCase
);

module.exports = router;
