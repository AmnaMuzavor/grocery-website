import React,{useContext} from "react";
import "./wishlist.css";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(AppContext);
  return (
    <div className="wishlist-container">
      <div className="breadcrumb">
  <Link to="/">Home</Link> / <Link to="/Wishlist">WishList</Link>
</div>

      <div className="wishlist-header">
        <i className="fa-regular fa-heart wishlist-icon"></i>
        <h2>My Wishlist</h2>
      </div>

      {wishlist.length === 0 && <p>No items in wishlist</p>}

      {wishlist.map((item) => (
        <div className="wishlist-item" key={item.id}>
          <img src={item.image} alt={item.name} className="wishlist-img" />

          <div className="wishlist-info">
            <h4>{item.name}</h4>
            <p>{item.weight}</p>
          </div>

          <div className="wishlist-price">
            <p>Each</p>
            <span>Rs.{item.price}</span>
          </div>

          <div
            className={`wishlist-stock ${
              item.stock ? "in-stock" : "out-stock"
            }`}
          >
            {item.stock ? "In stock" : "Out of stock"}
          </div>

          <div className="wishlist-actions">
            <button
              className="add-btn"
              disabled={!item.stock}
              onClick={() => addToCart(item)}
            >
              Add to cart
            </button>

            <button
              className="remove-btn"
              onClick={() => removeFromWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;