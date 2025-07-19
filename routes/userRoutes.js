const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Add user
router.post('/users', async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

// Get users
router.get('/users', async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});

// Claim points
router.post('/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1;
    user.points += points;
    await user.save();

    await ClaimHistory.create({ userId, name: user.name, points });
    res.status(200).json({ message: 'Points claimed', points });
  } catch {
    res.status(500).json({ error: 'Claim failed' });
  }
});

// Claim history
router.get('/history', async (req, res) => {
  const history = await ClaimHistory.find().sort({ timestamp: -1 }).limit(50);
  res.json(history);
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ points: -1 }).limit(parseInt(req.query.limit) || 10);
  res.json(users);
});

module.exports = router;
