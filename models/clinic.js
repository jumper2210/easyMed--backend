const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clinicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Clinic', clinicSchema)
