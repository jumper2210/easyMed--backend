const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
      },
    ],
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    chatMates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
      },
    ],
    role: {
      type: String,
      default: 'DOCTOR',
      required: true,
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

module.exports = mongoose.model('Doctor', doctorSchema);
