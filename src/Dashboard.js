// frontend/src/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  // State to store user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data from:', `${BACKEND_URL}/api/user`);
        
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          method: 'GET',
          credentials: 'include', // Important: include cookies for session
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`Failed to fetch user data: ${response.status}`);
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
        // Redirect to login if not authenticated
        if (err.message.includes('401')) {
          setTimeout(() => {
            window.location.href = `${BACKEND_URL}/login`;
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [BACKEND_URL]);

  // Show loading state
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
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  // Show error state
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
          <p>Error: {error}</p>
          <a href={`${BACKEND_URL}/login`}>Please login</a>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* --- Top Navigation / Header --- */}
      <header className="dashboard-header">
        <div className="logo">
          <span role="img" aria-label="utensils" style={{ marginRight: '8px' }}>🍴</span>
          UniEats
        </div>
        <nav className="dashboard-nav">
          {/* Add navigation links here if needed later */}
        </nav>
        <div className="user-profile">
          {/* Placeholder for profile picture */}
          {/* <img src={user.profilePictureUrl} alt="Profile" className="profile-pic-placeholder" /> */}
          <span className="user-name">Welcome, {user?.name || 'User'}!</span>
          <a href={`${BACKEND_URL}/logout`} className="logout-button-link">
            <button className="logout-button">Logout</button>
          </a>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="dashboard-main">
        <h1 className="dashboard-title">Your Dashboard</h1>

        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-button">Place New Order</button>
            <button className="action-button">View Order History</button>
            {/* Add more actions as needed */}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Orders (Placeholder)</h2>
          <div className="order-list-placeholder">
            <p>Your recent orders will appear here.</p>
            {/* You could add placeholder elements for individual orders */}
            <div className="placeholder-order-item">Order #1234 - Frist Grill - Delivered</div>
            <div className="placeholder-order-item">Order #1230 - Frist Grill - Picked Up</div>
          </div>
        </section>

        {/* Add more sections like Settings, Favorites, etc. later */}

      </main>

      {/* --- Footer (Optional) --- */}
      <footer className="dashboard-footer">
        UniEats &copy; 2025
      </footer>
    </div>
  );
}

export default Dashboard;