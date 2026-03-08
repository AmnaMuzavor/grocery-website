import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/About.css';
import logo from '../assets/essentialsLogo.jpg'
import Footer from '../components/Footer';

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className="main-container " >
      <div style={{ padding: '20px' }}>
        <button
          onClick={() => navigate('/account')}
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
      </div>
<div className="profile-part">
        <div className="profile-pic-box">
          <div className="pic-circle">
            <img src={logo} alt="Profile Icon" />
          </div>
        </div>
       
      </div>

      <div className="list-section">
        <div className="list-title">About us</div>
        <div className="white-box" style={{ padding: '20px' }}>
          <p className="about-text">
            Welcome to our Grocery Store. We are here to provide you with fresh vegetables, 
            fruits, and all your daily essentials.
          </p>
          <p className="about-text">
            Our mission is to make grocery shopping easy and fast for everyone. 
            We work directly with local farms to bring you the best quality products at the best prices.
          </p>
        </div>
      </div>

      <div className="list-section">
        <div className="list-title">Our Promise</div>
        <div className="white-box" style={{ padding: '20px' }}>
          <div className="promise-item">
            <strong>Fresh Quality:</strong>
            <p>Directly from local farms to your kitchen.</p>
          </div>
          <div className="promise-item" style={{ marginTop: '15px' }}>
            <strong>Best Prices:</strong>
            <p>Quality products at prices that fit your budget.</p>
          </div>
        </div>
      </div>
      
      <div className="list-section">
        <div className="white-box" style={{ padding: '20px', textAlign: 'center' }}>
          <p className="about-text" style={{ margin: '0' }}>
            Thank you for choosing us for your daily needs!
          </p>
        </div>
      </div>

    </div>
          <Footer/>
          </div>
  );
};

export default About;