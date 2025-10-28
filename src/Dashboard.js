// frontend/src/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css'

function Dashboard() {
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback for local dev
  const [user, setUser] = useState(null); // State to hold user data
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    // Function to fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/profile`, {
          credentials: 'include', // IMPORTANT: Send cookies with the request
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            // For now, just set an error. In a real app, you might redirect:
            // window.location.href = '/'; // Or use react-router's navigate
            console.error('User not authenticated. Redirecting is suggested.');
            setError('You are not logged in.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const userData = await response.json();
          setUser(userData); // Update state with user data
          setError(null); // Clear any previous errors
        }
      } catch (e) {
        console.error("Failed to fetch profile:", e);
        setError('Failed to load user profile.');
      }
    };

    fetchProfile();
  }, [BACKEND_URL]); // Dependency array includes BACKEND_URL

  // Basic loading state
  if (error) {
    return (
       <div style={{ padding: '20px', color: 'red' }}>
          Error: {error} <a href="/">Go Home</a>
       </div>
    );
  }

  if (!user) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  // --- Render the Dashboard UI ---
  return (
    // Example structure - adapt CSS as needed
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">UniEats Dashboard</div>
        <div className="user-profile">
          {/* We don't have a picture yet, just show name */}
          <span>Welcome, {user.name}!</span>
          {/* <img src={user.profilePictureUrl || 'default-avatar.png'} alt="Profile" /> */}
          <a href={`${BACKEND_URL}/logout`} style={{ marginLeft: '15px' }}>
            <button>Logout</button>
          </a>
        </div>
      </header>

      <main className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Your details:</p>
        <ul>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
          {/* Add more dashboard elements here */}
        </ul>
      </main>
    </div>
  );
}

export default Dashboard;