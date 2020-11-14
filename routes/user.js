const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const userController = require("../controllers/user");

const isAuth = require("../middleware/is-auth");

router.get("/getUser", isAuth, userController.getUser);

router.put(
  "/editUser",
  isAuth,
  [body("name").trim().isLength({ min: 5 })],
  userController.editUser
);
router.get("/getAllUsers", isAuth, userController.getAllUsers);
module.exports = router;
