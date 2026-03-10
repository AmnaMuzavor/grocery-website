import React, { useContext } from 'react';
import "./cart.css";
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from "react-router-dom";
const API = "https://grocery-website-bjbz.onrender.com";
function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/Cart">Cart</Link>
      </div>

      <div className="cart-header">
        <i className="fas fa-shopping-bag cart-icon"></i>
        <h2 className="cart-title">My Cart</h2>
      </div>

      {(!cart || cart.length === 0) && <p>Your cart is empty</p>}

      {cart && cart.map((item) => {
        const product = item.Product || item; 
        const id = item.product_id || item.id;

        return (
          <div className="cart-item" key={id}>
            <img
              src={
                product.image_url
                  ? `${API}${product.image_url}`
                  : product.image
              }
              alt={product.name}
              className="cart-img"
            />

            <div className="cart-info">
              <h4>{product.name}</h4>
              <p>{product.unit || product.weight}</p>
            </div>

            <div className="cart-each">
              <p>Each</p>
              <span>Rs.{product.price}</span>
            </div>

            <div className="cart-qty">
              <button onClick={() => decreaseQty(id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(id)}>+</button>
            </div>

            <div className="cart-total">
              <p>Total</p>
              <span>Rs.{product.price * item.quantity}</span>
            </div>

            <i
              className="fas fa-trash delete-icon"
              onClick={() => removeFromCart(id)}
            ></i>
          </div>
        );
      })}

      {cart && cart.length > 0 && (
        <div className="proceed-container">
          <button
            className="proceed-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
