import React from "react";
import "./wishlist.css";

const Wishlist = () => {
  return (
    <div className="wishlist-container">
      <p className="breadcrumb">Home / Wishlist</p>

      <div className="wishlist-header">
        <i className="fa-regular fa-heart wishlist-icon"></i>
        <h2>My Wishlist</h2>
      </div>

      <div className="wishlist-item">
        <img
          src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15"
          alt="product"
          className="wishlist-img"
        />

        <div className="wishlist-info">
          <h4>Mini Oranges</h4>
          <p>(200-230) g</p>
        </div>

        <div className="wishlist-price">
          <p>Each</p>
          <span>₹120</span>
        </div>

        <div className="wishlist-stock in-stock">
          In stock
        </div>

        <div className="wishlist-actions">
          <button className="add-btn">Add to cart</button>
          <button className="remove-btn">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;