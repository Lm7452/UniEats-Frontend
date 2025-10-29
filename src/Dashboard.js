// frontend/src/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data from:', `${BACKEND_URL}/api/user`);
        
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Authentication required (${response.status})`);
        }
        
        const data = await response.json();
        console.log('User data received:', data);
        
        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.message || 'Failed to get user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [BACKEND_URL]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="logo">
            <span role="img" aria-label="utensils" style={{ marginRight: '8px' }}>🍴</span>
            UniEats
          </div>
        </header>
        <main className="dashboard-main">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Loading your dashboard...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="logo">
            <span role="img" aria-label="utensils" style={{ marginRight: '8px' }}>🍴</span>
            UniEats
          </div>
        </header>
        <main className="dashboard-main">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Authentication Required</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              You need to be logged in to view this page.
            </p>
            <a 
              href={`${BACKEND_URL}/login`} 
              style={{ 
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#E77500',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '1.1em'
              }}
            >
              Login with Princeton
            </a>
            <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#999' }}>
              Error: {error}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <span role="img" aria-label="utensils" style={{ marginRight: '8px' }}>🍴</span>
          UniEats
        </div>
        <nav className="dashboard-nav">
          {/* Add navigation links here if needed later */}
        </nav>
        <div className="user-profile">
          <span className="user-name">Welcome, {user?.name || 'User'}!</span>
          <a href={`${BACKEND_URL}/logout`} className="logout-button-link">
            <button className="logout-button">Logout</button>
          </a>
        </div>
      </header>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Your Dashboard</h1>

        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-button">Place New Order</button>
            <button className="action-button">View Order History</button>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Orders (Placeholder)</h2>
          <div className="order-list-placeholder">
            <p>Your recent orders will appear here.</p>
            <div className="placeholder-order-item">Order #1234 - Frist Grill - Delivered</div>
            <div className="placeholder-order-item">Order #1230 - Frist Grill - Picked Up</div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        UniEats &copy; 2025
      </footer>
    </div>
  );
}

export default Dashboard;