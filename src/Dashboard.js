// frontend/src/Dashboard.js
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import './Dashboard.css'; // Assuming you have this CSS file

function Dashboard() {
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [user, setUser] = useState(null); // State for user data
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Function to fetch user profile
    const fetchProfile = async () => {
      setLoading(true); // Start loading
      setError(null);
      try {
        const response = await fetch(`${BACKEND_URL}/api/profile`, {
          credentials: 'include', // Crucial: Send session cookies
        });

        if (!response.ok) {
          if (response.status === 401) {
             setError('Not authenticated. Please log in.');
             // Optional: redirect to login page after a delay
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setUser(null); // Clear user data on error
        } else {
          const userData = await response.json();
          setUser(userData); // Set user data in state
        }
      } catch (e) {
        console.error("Failed to fetch profile:", e);
        setError('Failed to load user profile.');
        setUser(null);
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchProfile();
  }, [BACKEND_URL]); // Re-run if BACKEND_URL changes (though unlikely)

  // --- Render based on state ---

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  if (error) {
    return (
       <div style={{ padding: '20px', color: 'red' }}>
          Error: {error} <a href="/">Go Home</a>
       </div>
    );
  }

  // --- Render the Dashboard UI with actual user name ---
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <span role="img" aria-label="utensils" style={{ marginRight: '8px' }}>🍴</span>
          UniEats
        </div>
        <nav className="dashboard-nav">
          {/* Navigation links */}
        </nav>
        <div className="user-profile">
           {/* Display fetched name or a fallback */}
           <span className="user-name">Welcome, {user ? user.name : 'User'}!</span>
           <a href={`${BACKEND_URL}/logout`} className="logout-button-link">
             <button className="logout-button">Logout</button>
           </a>
        </div>
      </header>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Your Dashboard</h1>
        {user && ( // Only show details if user is loaded
            <section className="dashboard-section">
              <h2>Your details:</h2>
              <ul>
                <li>Email: {user.email}</li>
                <li>Role: {user.role}</li>
              </ul>
            </section>
        )}
        {/* Other sections remain as placeholders */}
        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          {/* ... action buttons ... */}
        </section>
        <section className="dashboard-section">
          <h2>Recent Orders (Placeholder)</h2>
          {/* ... placeholder orders ... */}
        </section>
      </main>

      <footer className="dashboard-footer">
        UniEats &copy; 2025
      </footer>
    </div>
  );
}

export default Dashboard;