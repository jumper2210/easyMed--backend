const User = require("../models/user")
const { validationResult } = require("express-validator")

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({ users: users })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getUser = async (req, res, next) => {
  const userId = req.userId
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      const error = new Error("User could not be found")
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      user: user,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.editUser = async (req, res, next) => {
  const { userId } = req
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.")
    error.statusCode = 422
    throw error
  }
  const name = req.body.name
  const avatar = req.body.selectedImage
  const phoneNumber = req.body.phoneNumber
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      errors.statusCode = 404
      throw new Error("user could not be found")
    }
    user.name = name
    user.avatar = avatar
    user.phoneNumber = phoneNumber
    res.status(200).json({
      user: user,
    })
    return user.save()
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 200
    }
    next(err)
  }
}
