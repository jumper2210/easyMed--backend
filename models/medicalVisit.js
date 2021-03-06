const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalVisitSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalVisit', medicalVisitSchema);
