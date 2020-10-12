const express = require("express");
const doctorsController = require("../controllers/doctors");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/getDoctors", isAuth, doctorsController.getDoctors);
router.post("/addDoctor", doctorsController.addDoctor);
module.exports = router;
