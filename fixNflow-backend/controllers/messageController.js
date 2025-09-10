const Message = require('../models/Message');

// Save a chat message
exports.saveMessage = async (req, res) => {
  const { repairRequestId, senderId, receiverId, message } = req.body;

  try {
    const newMessage = new Message({
      repairRequest: repairRequestId,
      sender: senderId,
      receiver: receiverId,
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages for a repair request
exports.getMessages = async (req, res) => {
  const { repairRequestId } = req.params;

  try {
    const messages = await Message.find({ repairRequest: repairRequestId })
      .sort('timestamp')
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
