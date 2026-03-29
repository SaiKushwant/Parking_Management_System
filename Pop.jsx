"use client"
import React, { useState } from "react"
import "./Pop.css"

function Pop({ isOpen, onClose,userdetails,fetchTasks }) {
 const [formData, setFormData] = useState({
  name: "",
  address: "",
  latitude: "",
  longitude: "",
  totalLots: "",
  price: "",
  features: "",
  secretKey: "",      // new
  imageBase64: "",
});


  if (!isOpen) return null

  const handleCancel = () => {
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        imageBase64: reader.result, // includes prefix automatically
      });
    };
    reader.readAsDataURL(file);
  };




  const handleSubmit =async (e) => {
   e.preventDefault();
  const payload = {
  userId: userdetails.id,
  name: formData.name,
  address: formData.address,
  latitude: formData.latitude,
  longitude: formData.longitude,
  totalLots: formData.totalLots,
  price: formData.price,
  features: formData.features.split(",").map(f => f.trim()),
  secretKey: formData.secretKey,
  image: formData.imageBase64,
};
    try {
      console.log("Submitting payload:", payload)
      const res = await fetch("http://localhost:5001/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) { 
        throw new Error("Failed to save task")
      }

      const data = await res.json()
      console.log("✅ Task saved:", data)
      onClose()
    } catch (err) {
      console.error("❌ Error:", err.message)
    }
    fetchTasks();
  }

 
  

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Parking Lot</h2>
          <button className="close-button" onClick={handleCancel}>×</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Parking Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Full Address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                className="form-input"
                placeholder="e.g. 28.61"
                required
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                className="form-input"
                placeholder="e.g. 77.2"
                required
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Total Lots</label>
              <input
                type="number"
                name="totalLots"
                className="form-input"
                placeholder="e.g. 50"
                required
                value={formData.totalLots}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Price ($/hour)</label>
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="e.g. 10"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Features</label>
            <input
              type="text"
              name="features"
              className="form-input"
              placeholder="Comma-separated (e.g. 24/7 Security,CCTV)"
              value={formData.features}
              onChange={handleChange}
            />
          </div>

  

<div className="form-group">
  <label className="form-label">Secret Key</label>
  <input
    type="text"
    name="secretKey"
    className="form-input"
    placeholder="Enter Secret Key"
    value={formData.secretKey}
    onChange={handleChange}
  />
</div>

          <div className="form-group">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Pop
