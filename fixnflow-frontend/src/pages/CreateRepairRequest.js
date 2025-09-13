import React, { useState, useContext } from "react";
import "./CreateRepairRequest.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const CreateRepairRequest = () => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
  
    brand: "",
    model: "",
    serialNumber: "",
    issueDescription: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.brand.trim()) errs.brand = "Brand is required";
    if (!formData.model.trim()) errs.model = "Model is required";
    if (!formData.serialNumber.trim()) errs.serialNumber = "Serial Number is required";
    if (!formData.issueDescription.trim()) errs.issueDescription = "Problem description is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/repairs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create repair request");
      }

      setSuccessMessage("Repair request created successfully!");
      setFormData({
        brand: "",
        model: "",
        serialNumber: "",
        issueDescription: "",
      });
       navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Repair Request</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-global">{errorMessage}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          {errors.brand && <span className="error-message">{errors.brand}</span>}
        </div>

        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          {errors.model && <span className="error-message">{errors.model}</span>}
        </div>

        <div>
          <label>Serial Number:</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
          />
          {errors.serialNumber && (
            <span className="error-message">{errors.serialNumber}</span>
          )}
        </div>

        <div>
          <label>Problem Description:</label>
          <textarea
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
            rows="4"
          />
          {errors.issueDescription && (
            <span className="error-message">{errors.issueDescription}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateRepairRequest;
