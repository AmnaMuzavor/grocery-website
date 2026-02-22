import React from 'react'
import "./cart.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Cart() {
  return (
    <div className="cart-container">
      <p className="breadcrumb">Home/Cart</p>

     <div className="cart-header">
  <i className="fas fa-shopping-bag cart-icon"></i>
  <h2 className="cart-title"> My Cart</h2>
</div>

      <div className="cart-item">
        <img
          src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15"
          alt="product"
          className="cart-img"
        />

        <div className="cart-info">
          <h4>Mini Oranges</h4>
          <p>(200-230) g</p>
        </div>

        <div className="cart-each">
          <p>Each</p>
          <span>₹120</span>
        </div>

        <div className="cart-qty">
          <p>Quantity</p>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        <div className="cart-total">
          <p>Total</p>
          <span>₹120</span>
        </div>

       <i className="fas fa-trash delete-icon"></i>
      </div>

      <div className="proceed-container">
        <button className="proceed-btn">Proceed →</button>
      </div>
    </div>
  );
}

export default Cart