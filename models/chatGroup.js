const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatGroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ChatGroup", chatGroupSchema);
