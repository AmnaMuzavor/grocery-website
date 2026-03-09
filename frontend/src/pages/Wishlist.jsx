import React, { useContext } from "react";
import "./Wishlist.css";
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

      {wishlist.map((item) => {
     const inStock =
  item.Product.stock_quantity > 0 && item.Product.is_available === true;
        return (
          <div className="wishlist-item" key={item.wishlist_id}>
            <img
              src={`http://localhost:5001${item.Product.image_url}`}
              alt={item.Product.name}
              className="wishlist-img"
            />

            <div className="wishlist-info">
              <h4>{item.Product.name}</h4>
              <p>{item.Product.unit}</p>
            </div>

            <div className="wishlist-price">
              <p>Each</p>
              <span>Rs.{item.Product.price}</span>
            </div>

 <div
  className={`wishlist-stock ${inStock ? "in-stock" : "out-stock"}`}
>
  {inStock ? "In stock" : "Out of stock"}
</div>


            <div className="wishlist-actions">
            <button
              className="add-btn"
              disabled={!inStock}
              onClick={() => {
                addToCart({
                  id: item.Product.product_id,
                  name: item.Product.name,
                  price: item.Product.discount_price || item.Product.price,
                  stock: item.Product.is_available,
                  image: item.Product.image_url,
                  weight: item.Product.unit
                });
              }}
            >
              Add to cart
            </button>

              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.wishlist_id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
