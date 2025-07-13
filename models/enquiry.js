const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  message: String,
  plotNo: String,
  time: { type: Date, default: Date.now },
}, { timestamps: true, collection: 'enquiries' });

module.exports = mongoose.model('Enquiry', enquirySchema);