const Device = require('../models/Device');
const RepairRequest = require('../models/RepairRequest');

// Create a new device and repair request
exports.createRepairRequest = async (req, res) => {
  const { brand, model, serialNumber, issueDescription } = req.body;

  try {
    // Create device linked to user
    const device = new Device({
      user: req.userId,
      brand,
      model,
      serialNumber,
    });
    await device.save();

    // Create repair request linked to user and device
    const repairRequest = new RepairRequest({
      user: req.userId,
      device: device._id,
      issueDescription,
    });
    await repairRequest.save();

    res.status(201).json(repairRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all repair requests of logged-in user
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await RepairRequest.find({ user: req.userId })
      .populate('device')
      .populate('assignedShop', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
