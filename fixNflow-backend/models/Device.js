// models/Device.js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, required: true },
  issueDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Device', deviceSchema);
