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
      type: Object,
    },
    doctor: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalVisit', medicalVisitSchema);
