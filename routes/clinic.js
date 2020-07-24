const express = require("express");

const clinicController = require("../controllers/clinic");

const router = express.Router();

router.get("/getClinics", clinicController.getClinics);

router.post("/createClinic", clinicController.createClinic);

module.exports = router;
