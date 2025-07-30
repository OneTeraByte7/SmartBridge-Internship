const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/chat/history/:userId/:agentId
router.get('/history/:userId/:agentId', async (req, res) => {
  const { userId, agentId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: agentId },
        { sender: agentId, receiver: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/chat/send
router.post('/send', async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const newMsg = new Message({ sender, receiver, content });
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
