const express = require("express");

// const {body} = require('express-validator/check')

const clinicController = require("../controllers/clinic");

const router = express.Router();

router.get("/clinics", clinicController.getClinics);

router.post("/clinic", clinicController.createClinic);

module.exports = router;
