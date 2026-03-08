import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Address from '../components/Address';
import '../components/Account.css';
import About from './About';
import profileicon from '../assets/profile-iconnnn.png';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import Wishlist from './Wishlist';


function Account() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  if (showAddress) {
    return (
      <div className="main-container">
        <div style={{ padding: '20px' }}>
          <button
            onClick={() => setShowAddress(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#34d399',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
            ← Back
          </button>
          <Address />
        </div>
      </div>
    );
  }

  return (
    <div>
    <div className="main-container">
      <div className="profile-part">
        <div className="profile-pic-box">
          <div className="pic-circle">
            <img src={profileicon} alt="Profile Icon" />
          </div>
        </div>
        <div className="name-text">Your account</div>
      </div>

      <div className="list-section">
        <div className="list-title">Your information</div>
        <div className="white-box">
          <button
            onClick={() => setShowAddress(true)}
            className="item-row"
          >
            <span className="left-side">
              <span className="text-label">Address</span>
            </span>
            <span className="right-arrow">›</span>
          </button>
          <a href="/MyOrders" className="item-row">
            <span className="left-side">
              <span className="text-label">Your orders</span>
            </span>
            <span className="right-arrow">›</span>
          </a>
         <Link to="/wishlist" className="item-row">
  <span className="left-side">
    <span className="text-label">Your wishlist</span>
  </span>
  <span className="right-arrow">›</span>
</Link>
        </div>
      </div>

      <div className="list-section">
        <div className="list-title">Other Information</div>
        <div className="white-box">
          <Link to="/about" className="item-row">
            <span className="left-side">
              <span className="text-label">About us</span>
            </span>
            <span className="right-arrow">›</span>
          </Link>
          <button
            onClick={handleLogout}
            className="item-row"
          >
            <span className="left-side">
              <span className="text-label">Log out</span>
            </span>
            <span className="right-arrow">›</span>
          </button>
        </div>
      </div>
   
    </div>
        <Footer />
    </div>
   
  );
}

export default Account;