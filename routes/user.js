const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const userController = require("../controllers/user");

const isAuth = require("../middleware/is-auth");

const { ROLES } = require("../helpers/_roles");
const { authRole } = require("../helpers/_authRole");

router.get("/getUser", isAuth, userController.getUser);

router.put(
  "/editUser",
  isAuth,
  [body("name").trim().isLength({ min: 5 })],
  userController.editUser
);
router.get(
  "/getAllUsers",
  isAuth,
  authRole(ROLES.DOCTOR),
  userController.getAllUsers
);
module.exports = router;
