const mongoose = require('mongoose');

const ClaimHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  points: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClaimHistory', ClaimHistorySchema);
