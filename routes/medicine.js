const express = require("express");
const medicineController = require("../controllers/medicine");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const { ROLES } = require("../helpers/_roles");
const { authRole } = require("../helpers/_authRole");

router.post(
  "/assignMedicine/:patientId",
  isAuth,
  authRole(ROLES.DOCTOR),
  medicineController.assignMedicine
);

router.get(
  "/loadPatientMedicines/:patientId",
  isAuth,
  medicineController.loadPatientMedicines
);

router.delete(
  "/deleteMedicine/:medicineId",
  isAuth,
  authRole(ROLES.PATIENT),
  medicineController.deleteMedicine
);

module.exports = router;
