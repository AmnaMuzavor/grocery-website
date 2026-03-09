import "./Footer.css";
import { Link } from "react-router-dom"; 
import Insta from "../assets/Insta.png";
import Twitter from "../assets/twitter.png";
import Facebook from "../assets/facebook.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

       
        <div className="footer-brand">
          <div className="flogo">
            <Link to="/" className="logo" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="logo-icon">
                <span>E</span>
              </div>
              <span className="logo-text">Essentials</span>
            </Link>
          </div>
          <p>We deliver quality at your doorstep all in your clicks.</p>
        </div>

    
        <div className="footer-links">
          <h4>Pages</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/">Home</Link>
        </div>

      
        <div className="footer-links">
          <h4>Categories</h4>
          <Link to="/fruits">Fruits</Link>
          <Link to="/dairy">Dairy</Link>
          <Link to="/snacks">Snacks</Link>
          <Link to="/beverages">Beverages</Link>
        </div>

        <div className="footer-links">
          <h4>Locations</h4>
          <p>Goa</p>
          <p>Kerala</p>
          <p>Mumbai</p>
          <p>Pune</p>
        </div>
       
        <div className="footer-links">
           <div className="social-icons">
          <h4>Socials</h4>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={Insta} alt="Instagram" /> 
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={Twitter} alt="X" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={Facebook} alt="Facebook" />
          </a>
        </div>
        
</div>

      </div>

    
      <div className="footer-bottom">
        <p>Copyright © 2026 | Esssentials    </p>
        
      </div>
    </footer>
  );
}

export default Footer;
