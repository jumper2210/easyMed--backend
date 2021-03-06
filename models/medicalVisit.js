const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalVisitSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    medicalVisitDoctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    medicalVisitPatient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('MedicalVisit', medicalVisitSchema);
