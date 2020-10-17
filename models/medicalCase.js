const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicalCaseSchema = new Schema(
  {
    pickedSymptom: {
      type: String,
    },
    otherSymptom: {
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
    escalation: {
      type: String,
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
      ref: "User",
      required: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("MedicalCase", medicalCaseSchema);
