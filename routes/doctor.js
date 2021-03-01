const express = require('express')
const { ROLES } = require('../helpers/_roles')
const doctorController = require('../controllers/doctor')
const isAuth = require('../middleware/is-auth')
const { authRole } = require('../helpers/_authRole')
const router = express.Router()

router.get(
  '/getClinicDoctors/:clinicId',
  isAuth,
  doctorController.getClinicDoctors
)

module.exports = router
