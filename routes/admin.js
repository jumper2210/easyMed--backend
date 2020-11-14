const express = require("express")
const adminController = require("../controllers/admin")
const isAuth = require("../middleware/is-auth")
const { authRole } = require("../helpers/_authRole")
const { ROLES } = require("../helpers/_roles")
const router = express.Router()

router.put(
  "/setDoctorRole/:userId",
  isAuth,
  authRole(ROLES.ADMIN),
  adminController.setDoctorRole
)

module.exports = router
