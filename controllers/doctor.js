const Clinic = require('../models/clinic')

exports.getClinicDoctors = async (req, res, next) => {
  const { clinicId } = req.params
  await Clinic.findOne({ _id: clinicId })
    .populate('doctors')
    .then((result) => {
      res.status(200).json({ doctors: result.doctors })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
