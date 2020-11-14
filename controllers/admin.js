const User = require("../models/user")

exports.setDoctorRole = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
      const error = new Error("User with this id can't be found")
      error.statusCode = 404
      throw error
    }
    user.role = "DOCTOR"
    return user.save()
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 200
    }
    next(err)
  }
}
