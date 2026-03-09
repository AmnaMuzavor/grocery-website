import React, { useState } from 'react'
import{ Link } from 'react-router-dom' 
import { AppContext } from '../context/AppContext'
import './Navbar.css'
import { useNavigate } from "react-router-dom";
import cartIcon from '../assets/Shopping-bag.png'
import accountIcon from '../assets/User.png'
import searchIcon from '../assets/search.png'
import wishlistIcon from '../assets/Heart.png'


const Navbar = () => {
  const navigate = useNavigate();
const [searchText, setSearchText] = useState("");

  const [showSearch, setShowSearch] = useState(false)
  const { user, setUser } = React.useContext(AppContext);
   const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully");
  };

console.log("USER:", user);
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-flex">

<button
  className="mobile-menu-btn"
  onClick={() => setMobileOpen(true)}
>
  ☰
</button>
          <div className="logo">
            <Link to="/" className="logo">
          
           <div className="logo-icon">
                        <span>E</span>
                    </div>
            <span className="logo-text">Essentials</span>
            </Link>
          </div>

          {/* <nav className="nav"> */}
          <nav className={`nav ${mobileOpen ? "open" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
            <Link to="/shopp">Shop</Link>
            <Link to="/ProductCategories">Categories</Link>
            {/* <Link to="/Products">About</Link> */}
      {user?.role === "admin" && <Link to="/admin/categories">Dashboard</Link>}
          </nav>
 {mobileOpen && (
            <div
              className="overlay"
              onClick={() => setMobileOpen(false)}
            ></div>
          )}

          <div className="actions">

            {showSearch && (
<input
  type="text"
  placeholder="Search products..."
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
    if (e.key === "Enter") {
  navigate(`/shop?search=${searchText.trim()}`);
}
    }
  }}
  style={{
    padding: '6px 10px',
    borderRadius: '20px',
    border: '1px solid #dcfce7',
    outline: 'none'
  }}
/>       )}
            <button
              className="search-btn"
              onClick={() => setShowSearch(!showSearch)}
            >
              <img src={searchIcon} alt="Search" width="16" />
            </button>

              {/* <button className="search-btn">
              <img src={accountIcon} alt="Account" width="16" /> */}
              {/* <ul className="hidden hover:block absolute top-10 right-0 bg-white shadow-md rounded-md p-4">
                <li >My orders</li>
                <li>Log out</li>
              </ul> */}
            {/* </button> */}

            <Link to="/account" className="search-btn">
  <img src={accountIcon} alt="Account" width="16" />
</Link>

<Link to="/wishlist" className="search-btn">
  <img src={wishlistIcon} alt="Wishlist" className="cart-icon" />
</Link>


            <Link to="/Cart" className="cart-btn">
  <img src={cartIcon} alt="Cart" className="cart-icon" />
</Link>
          

          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
