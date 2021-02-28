const express = require('express')
const { ROLES } = require('../helpers/_roles')
const clinicController = require('../controllers/clinic')
const isAuth = require('../middleware/is-auth')
const { authRole } = require('../helpers/_authRole')
const router = express.Router()

router.get('/getClinics', isAuth, clinicController.getClinics)

router.post(
  '/createClinic',
  isAuth,
  authRole(ROLES.ADMIN),
  clinicController.createClinic
)

router.put('/assignClinic/:patientId', isAuth, clinicController.assignClinic)

module.exports = router
