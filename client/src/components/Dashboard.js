import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, fetchUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [balanceRes, transactionsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/transactions/balance'),
        axios.get('http://localhost:5000/api/transactions/history')
      ]);
      
      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data.slice(0, 5));
      await fetchUser();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0 }}>
        <div className="balance-display">
          <h3>Your Balance</h3>
          <div className="amount">₹{balance.toFixed(2)}</div>
        </div>

        <div className="dashboard-grid">
          <Link to="/transfer" style={{ textDecoration: 'none' }}>
            <div className="dashboard-card">
              <h3>💸 Transfer Money</h3>
              <p>Send money to other users</p>
            </div>
          </Link>

          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div className="dashboard-card">
              <h3>👤 Profile</h3>
              <p>View and edit your profile</p>
            </div>
          </Link>

          <div className="dashboard-card">
            <h3>📊 Transactions</h3>
            <p>View your transaction history</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '40px', flex: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
        <h2 style={{ flexShrink: 0 }}>Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            No transactions yet
          </p>
        ) : (
          <div className="transaction-list" style={{ flex: '1', overflowY: 'auto' }}>
            {transactions.map((transaction) => {
              const isReceived = transaction.to._id === user.id || transaction.to._id === user._id;
              const sender = transaction.from;
              const recipient = transaction.to;
              const amount = transaction.amount;
              
              return (
                <div key={transaction._id} className="transaction-item">
                  <div className="details">
                    <div className="name">
                      {isReceived ? (
                        <>Received from: <strong>{sender.name}</strong></>
                      ) : (
                        <>Sent to: <strong>{recipient.name}</strong></>
                      )}
                    </div>
                    <div className="date">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className={`amount ${isReceived ? 'positive' : 'negative'}`}>
                    {isReceived ? '+' : '-'}₹{amount.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

