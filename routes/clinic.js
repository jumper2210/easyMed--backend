const express = require("express");

const clinicController = require("../controllers/clinic");

const router = express.Router();

router.get("/clinics", clinicController.getClinics);

module.exports = router;
