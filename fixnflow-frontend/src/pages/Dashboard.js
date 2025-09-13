import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user info and repair requests on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example: Adjust endpoint for your backend's user profile
        const userRes = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const requestsRes = await axios.get('http://localhost:5000/api/repairs/my-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(requestsRes.data);
      } catch (error) {
        console.error('Failed to fetch user or requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/repairs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRequests(requests.filter((req) => req._id !== id));
  } catch (error) {
    alert("Failed to delete repair request");
  }
};


  if (loading) return <p>Loading dashboard...</p>;


  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name || 'User'}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <section>
        <h2>Your Repair Requests</h2>
        {requests && requests.length > 0 ? (
          <ul className="requests-list">
            {requests.map((req) => (
              <li key={req._id} className="request-item">
  <strong>{req.device?.brand} {req.device?.model}</strong> - Status: {req.status}
  <p>{req.issueDescription}</p>
  <div className="request-actions">
    <button
      className="action-btn"
      onClick={() => handleDelete(req._id)}
      title="Delete"
    >
      🗑️
    </button>
    <button
      className="action-btn"
      onClick={() => navigate(`/edit-repair-request/${req._id}`)}
      title="Edit"
    >
      ✎
    </button>
  </div>
</li>
            ))}
          </ul>
        ) : (
          <p>No repair requests found.</p>
        )}
      </section>

      <button onClick={() => navigate('/create-repair-request')} className="create-request-btn">
        Create New Repair Request
      </button>
    </div>
  );
};

export default Dashboard;
