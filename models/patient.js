const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    chatMates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    healthInformations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'HealthInformation',
      },
    ],
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
      },
    ],
    medicines: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
      },
    ],
    chatMates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      default: 'PATIENT',
    },
    clinics: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Clinic',
      },
    ],
    isAssignClinic: {
      type: Boolean,
      default: false,
    },
    medicalVisits: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MedicalVisit',
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
