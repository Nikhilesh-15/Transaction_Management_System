import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Transfer() {
  const { user, fetchUser } = useAuth();
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipients();
    fetchBalance();
  }, []);

  const fetchRecipients = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/transactions/users');
      setRecipients(data);
    } catch (error) {
      setError('Failed to load recipients');
    }
  };

  const fetchBalance = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/transactions/balance');
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const transferAmount = parseFloat(amount);

    if (!selectedRecipient) {
      setError('Please select a recipient');
      setLoading(false);
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      setError('Please enter a valid amount');
      setLoading(false);
      return;
    }

    if (transferAmount > balance) {
      setError('Insufficient balance');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/transactions/transfer', {
        to: selectedRecipient,
        amount: transferAmount
      });

      setSuccess(`Successfully transferred ₹${transferAmount.toFixed(2)}`);
      setAmount('');
      setSelectedRecipient('');
      await fetchBalance();
      await fetchUser();
    } catch (error) {
      setError(error.response?.data?.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Transfer Money
      </h2>

      <div className="balance-display" style={{ marginBottom: '30px' }}>
        <h3>Available Balance</h3>
        <div className="amount">₹{balance.toFixed(2)}</div>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Recipient</label>
          <select
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
            required
          >
            <option value="">Choose a recipient</option>
            {recipients.map((recipient) => (
              <option key={recipient._id} value={recipient._id}>
                {recipient.name} ({recipient.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
}

export default Transfer;

