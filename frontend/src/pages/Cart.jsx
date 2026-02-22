import React,{useContext} from 'react';
import "./cart.css";
import { AppContext } from '../context/AppContext';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const{cart,removeFromCart,increaseQty,decreaseQty}=useContext(AppContext);
  const navigate = useNavigate();
  return(
    <div className="cart-container">
      <div className="breadcrumb">
  <Link to="/">Home</Link> / <Link to="/Cart">Cart</Link>
</div>

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
            <span>Rs.{item.price}</span>
          </div>

        <div className="cart-qty">
  <button onClick={() => decreaseQty(item.id)}>-</button>
  <span>{item.quantity}</span>
  <button onClick={() => increaseQty(item.id)}>+</button>
</div>

          <div className="cart-total">
            <p>Total</p>
            <span>Rs.{item.price * item.quantity}</span>
          </div>

          <i
            className="fas fa-trash delete-icon"
            onClick={() => removeFromCart(item.id)}
          ></i>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="proceed-container">
          <button 
  className="proceed-btn"
  disabled={cart.length === 0}
  onClick={() => navigate("/checkout")}>Proceed <i className="fas fa-arrow-right"></i></button>
        </div>
      )}
    </div>
  );
}

export default Cart