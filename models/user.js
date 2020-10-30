const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
        ref: "User",
      },
    ],
    medicalCases: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalCase",
      },
    ],
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    medicines: [
      {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
