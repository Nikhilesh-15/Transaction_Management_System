import express from 'express';
import { auth } from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const router = express.Router();

// Get balance
router.get('/balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Transfer money
router.post('/transfer', auth, async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount) {
      return res.status(400).json({ message: 'Please provide recipient and amount' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const sender = await User.findById(req.user.id);
    const recipient = await User.findById(to);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (sender._id.toString() === recipient._id.toString()) {
      return res.status(400).json({ message: 'Cannot transfer to yourself' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    // Create single transaction record (visible to both sender and receiver)
    const transaction = new Transaction({
      from: sender._id,
      to: recipient._id,
      amount,
      type: 'transfer',
      status: 'success'
    });

    await transaction.save();

    res.json({
      message: 'Transfer successful',
      newBalance: sender.balance,
      transaction: transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get transaction history
router.get('/history', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ from: req.user.id }, { to: req.user.id }]
    })
    .populate('from', 'name email')
    .populate('to', 'name email')
    .sort({ createdAt: -1 })
    .limit(50);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users for transfer
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('name email')
      .limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

