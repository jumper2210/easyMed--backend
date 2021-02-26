const express = require('express')
const { body } = require('express-validator')
const adminController = require('../controllers/admin')
const router = express.Router()
const Doctor = require('../models/doctor')

router.post(
  '/assignDoctor',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Doctor.findOne({ email: value }).then((doctorDoc) => {
          if (doctorDoc) {
            return Promise.reject('Email address already exists!')
          }
        })
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
  ],
  adminController.assignDoctor
)

module.exports = router
