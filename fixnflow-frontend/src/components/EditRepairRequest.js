// src/components/EditRepairRequest.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditRepairRequest = () => {
  const { id } = useParams();    // get request ID from URL params
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    issueDescription: '',
    // add other editable fields if needed
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch existing repair request data on mount
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/repairs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          issueDescription: res.data.issueDescription || '',
          // set other fields here if applicable
        });
      } catch (error) {
        setErrorMessage('Failed to load repair request');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/repairs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Redirect to dashboard after success
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Failed to update repair request');
    }
  };

  if (loading) return <p>Loading repair request details...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Edit Repair Request</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Issue Description:</label>
          <textarea
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditRepairRequest;
