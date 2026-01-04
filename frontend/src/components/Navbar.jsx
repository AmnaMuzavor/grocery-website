import React, { useState } from 'react'
import{ Link } from 'react-router-dom' 
import { AppContext } from '../context/AppContext'
import './Navbar.css'

import cartIcon from '../assets/shopping-bag.png'
import accountIcon from '../assets/user.png'
import searchIcon from '../assets/search.png'

const Navbar = () => {

  const [showSearch, setShowSearch] = useState(false)
  const { user, setUser } = React.useContext(AppContext);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-flex">

          <button className="mobile-menu-btn">☰</button>

          <div className="logo">
            {/* <img src={logo} alt="Logo" width="32" /> */}
           <div class="logo-icon">
                        <span>E</span>
                    </div>
            <span className="logo-text">Essentials</span>
          </div>

          <nav className="nav">
            <Link to="/Products">Shop</Link>
            <Link to="/Products">Categories</Link>
            <Link to="/Products">About</Link>
          </nav>

          <div className="actions">

            {showSearch && (
              <input
                type="text"
                placeholder="Search products..."
                style={{
                  padding: '6px 10px',
                  borderRadius: '20px',
                  border: '1px solid #dcfce7',
                  outline: 'none'
                }}
              />
            )}
            <button
              className="search-btn"
              onClick={() => setShowSearch(!showSearch)}
            >
              <img src={searchIcon} alt="Search" width="16" />
            </button>

              <button className="search-btn">
              <img src={accountIcon} alt="Account" width="16" />
              {/* <ul className="hidden hover:block absolute top-10 right-0 bg-white shadow-md rounded-md p-4">
                <li >My orders</li>
                <li>Log out</li>
              </ul> */}
            </button>

            <button className="cart-btn">
              <img src={cartIcon} alt="Cart" className="cart-icon" />

            </button>

            
          

          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
