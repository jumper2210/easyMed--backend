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
  "/getUserMedicalCases",
  isAuth,
  medicalCaseController.getUserMedicalCases
);

module.exports = router;
