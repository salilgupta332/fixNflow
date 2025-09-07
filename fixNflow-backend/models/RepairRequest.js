// models/RepairRequest.js
const mongoose = require('mongoose');

const repairRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  issueDescription: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  assignedShop: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Shop user
  priceQuote: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RepairRequest', repairRequestSchema);
