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
    status: {
      type: String,
      default: "new User added!",
    },
    medicalCases: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalCase",
      },
    ],
    chatGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: "ChatGroup",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Messages",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
