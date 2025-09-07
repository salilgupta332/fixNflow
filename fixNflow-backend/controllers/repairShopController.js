const RepairRequest = require('../models/RepairRequest');

// List all unassigned repair requests (status: 'pending', no assignedShop)
exports.listAvailableRequests = async (req, res) => {
  try {
    const requests = await RepairRequest.find({ status: 'pending', assignedShop: { $exists: false } })
      .populate('device')
      .populate('user', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign logged-in shop user to a repair request by ID
exports.assignRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await RepairRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.assignedShop) return res.status(400).json({ message: 'Request already assigned' });

    request.assignedShop = req.userId;  // logged-in shop id
    request.status = 'accepted';
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update repair request status and price (only assigned shop can update)
exports.updateRequest = async (req, res) => {
  const requestId = req.params.id;
  const { status, priceQuote } = req.body;

  try {
    const request = await RepairRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.assignedShop?.toString() !== req.userId)
      return res.status(403).json({ message: 'Not authorized to update this request' });

    if (status) request.status = status;
    if (priceQuote !== undefined) request.priceQuote = priceQuote;

    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
