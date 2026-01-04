import "./Footer.css";

// import logo from "../assets/logo.png";
import Insta from "../assets/Insta.png";
import Twitter from "../assets/Twitter.png";
import Facebook from "../assets/Facebook.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <div className="logo">
            <img src="" alt="Essentials Logo" />
            <span>Essentials</span>
          </div>
          <p>We deliver quality at your doorstep all in your clicks.</p>
        </div>

        {/* Pages */}
        <div className="footer-links">
          <h4>Pages</h4>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Categories</a>
          <a href="#">Home</a>
        </div>

        {/* Categories */}
        <div className="footer-links">
          <h4>Categories</h4>
          <a href="#">Fruits</a>
          <a href="#">Dairy</a>
          <a href="#">Snacks</a>
          <a href="#">Beverages</a>
        </div>

        {/* Locations */}
        <div className="footer-links">
          <h4>Locations</h4>
          <p>Goa </p>
          <p> Kerala </p>
          <p> Mumbai </p>
          <p> Pune </p>
        </div>

        
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>Copyright © 2026 | </p>

        <div className="social-icons">
          <img src={Insta} alt="Instagram" />
          <img src={Twitter} alt="X" />
          <img src={Facebook} alt="Facebook" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
