const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  timeOfTaking: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
})

module.exports = mongoose.model('Medicine', medicineSchema)
