const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const healthInformationSchema = new Schema(
  {
    symptom: {
      type: String,
    },
    age: {
      type: String,
      required: true,
    },
    scale: {
      type: String,
      required: true,
    },
    increase: {
      type: String,
      required: true,
    },
    locationOfPain: {
      type: String,
    },
    radiance: {
      type: String,
    },
    imageUri: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('HealthInformation', healthInformationSchema);
