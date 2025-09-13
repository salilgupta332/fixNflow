const Device = require('../models/Device');
const RepairRequest = require('../models/RepairRequest');

// Create a new device and repair request
exports.createRepairRequest = async (req, res) => {
  const { brand, model, serialNumber, issueDescription } = req.body;

  try {
    // Create device linked to user
    const device = new Device({
      user: req.user._id,
      brand,
      model,
      serialNumber,
      issueDescription
    });
    await device.save();

    // Create repair request linked to user and device
    const repairRequest = new RepairRequest({
      user: req.user._id,
      device: device._id,
      issueDescription
    });
    await repairRequest.save();

    res.status(201).json(repairRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await RepairRequest.find({ user: req.user._id })
      .populate('device')
      .populate('assignedShop', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all repair requests of logged-in user
exports.getRepairRequestById = async (req, res) => {
  try {
    const request = await RepairRequest.findById(req.params.id)
      .populate('device')
      .populate('assignedShop', 'name email');
    if (!request) {
      return res.status(404).json({ message: 'Repair request not found' });
    }
    // Optional auth check:
    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: 'Invalid request ID' });
  }
};

exports.updateRepairRequest = async (req, res) => {
  try {
    const request = await RepairRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(request, req.body);
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a repair request
exports.deleteRepairRequest = async (req, res) => {
  try {
    const request = await RepairRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Ensure req.user is set
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Use deleteOne() instead of remove()
    await request.deleteOne();

    res.json({ message: 'Repair request deleted' });
  } catch (error) {
    console.error('Delete request error:', error);  // Log the actual error
    res.status(500).json({ message: 'Server error' });
  }
};