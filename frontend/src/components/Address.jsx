import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import './Address.css';

function Address() {
  const { user } = useContext(AppContext);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address_line: '',
    city: '',
    pincode: ''
  });

  const token = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/address`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(response.data.addresses);
    } catch (error) {
      console.log('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.address_line || !formData.city || !formData.pincode) {
      alert('All fields are required!');
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await axios.put(`${apiUrl}/api/address/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Address updated successfully!');
      } else {
        await axios.post(`${apiUrl}/api/address`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Address created successfully!');
      }

      setFormData({ address_line: '', city: '', pincode: '' });
      setShowForm(false);
      setEditingId(null);
      fetchAddresses();
    } catch (error) {
      console.log('Error saving address:', error);
      alert('Error saving address');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      address_line: address.address_line,
      city: address.city,
      pincode: address.pincode
    });
    setEditingId(address.address_id);
    setShowForm(true);
  };

  const handleDelete = async (address_id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true);
        await axios.delete(`${apiUrl}/api/address/${address_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Address deleted successfully!');
        fetchAddresses();
      } catch (error) {
        console.log('Error deleting address:', error);
        alert('Error deleting address');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ address_line: '', city: '', pincode: '' });
  };

  return (
    <div className="address-container">
      <h2 className="address-title">My Addresses</h2>

      {showForm && (
        <div className="address-form-box">
          <h3>{editingId ? 'Edit Address' : 'Add New Address'}</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Address Line</label>
              <input
                type="text"
                name="address_line"
                value={formData.address_line}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city name"
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter pincode"
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <button className="btn-add-address" onClick={() => setShowForm(true)}>
          + Add New Address
        </button>
      )}

      <div className="addresses-list">
        {loading && !showForm ? <p>Loading...</p> : null}

        {addresses.length === 0 && !showForm ? (
          <p className="no-addresses">No addresses yet. Add one!</p>
        ) : null}

        {addresses.map((addr) => (
          <div key={addr.address_id} className="address-item">
            <div className="address-info">
              <p className="address-line"><strong>Address:</strong> {addr.address_line}</p>
              <p className="address-city"><strong>City:</strong> {addr.city}</p>
              <p className="address-pincode"><strong>Pincode:</strong> {addr.pincode}</p>
            </div>

            <div className="address-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(addr)}
                disabled={loading}
              >
               Change
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(addr.address_id)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;