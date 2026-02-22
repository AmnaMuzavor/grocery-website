import React,{useContext} from 'react';
import "./cart.css";
import { AppContext } from '../context/AppContext';

function Cart() {
  const{cart,removeFromCart}=useContext(AppContext);
  return(
    <div className="cart-container">
      <p className="breadcrumb">Home / Cart</p>

      <div className="cart-header">
        <i className="fas fa-shopping-bag cart-icon"></i>
        <h2 className="cart-title">My Cart</h2>
      </div>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} className="cart-img" />

          <div className="cart-info">
            <h4>{item.name}</h4>
            <p>{item.weight}</p>
          </div>

          <div className="cart-each">
            <p>Each</p>
            <span>₹{item.price}</span>
          </div>

          <div className="cart-qty">
            <p>Quantity</p>
            <span>{item.quantity}</span>
          </div>

          <div className="cart-total">
            <p>Total</p>
            <span>₹{item.price * item.quantity}</span>
          </div>

          <i
            className="fas fa-trash delete-icon"
            onClick={() => removeFromCart(item.id)}
          ></i>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="proceed-container">
          <button className="proceed-btn">Proceed →</button>
        </div>
      )}
    </div>
  );
}

export default Cart