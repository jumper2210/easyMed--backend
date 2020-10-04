const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  createdBy: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
