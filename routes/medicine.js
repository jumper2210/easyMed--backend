const { request } = require("express");

const express = require("express");

const medicineController = require("../controllers/medicine");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.post(
  "/assignMedicine/:patientId",
  isAuth,
  medicineController.assignMedicine
);

router.get(
  "/loadPatientMedicines/:patientId",
  medicineController.loadPatientMedicines
);

module.exports = router;
