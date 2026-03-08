import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./checkout.css";

function Checkout() {
  const { cart, user, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    payment: "COD",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const addressList = response.data.addresses;
      setAddresses(addressList);

      if (addressList.length > 0) {
        setSelectedAddress(addressList[0]);
        setUseSavedAddress(true);
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setShowAddressSelector(false);
  };

  const handleUseSavedAddress = (e) => {
    const checked = e.target.checked;
    setUseSavedAddress(checked);
    if (checked && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const deliveryCharge = subtotal < 1000 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Real-time validation
    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    } else if (name === "pincode") {
      // Only allow numeric values
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: numericValue });
      
      if (numericValue && numericValue.length !== 6) {
        error = "Pincode must be exactly 6 digits";
      }
      return;
    } else if (name === "city") {
      if (value && value.length < 2) {
        error = "Please enter a valid city name";
      }
    } else if (name === "address") {
      if (value && value.length < 5) {
        error = "Please enter a complete address";
      }
    }
    
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., example@gmail.com)";
      isValid = false;
    }

    // Address validation
    if (!useSavedAddress) {
      if (!formData.address || formData.address.trim().length < 5) {
        newErrors.address = "Please enter a complete delivery address";
        isValid = false;
      }

      // City validation
      if (!formData.city || formData.city.trim().length < 2) {
        newErrors.city = "Please enter a valid city name";
        isValid = false;
      }

      // Pincode validation
      if (!formData.pincode) {
        newErrors.pincode = "Pincode is required";
        isValid = false;
      } else if (formData.pincode.length !== 6) {
        newErrors.pincode = "Pincode must be exactly 6 digits";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRazorpayPayment = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (useSavedAddress && !selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!useSavedAddress && (!formData.address || !formData.city || !formData.pincode)) {
      toast.error("Please fill in all address fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/payment/create-order",
        { user_id: user.id }
      );

      const { razorpayOrder, order_id } = response.data;

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_SMd5kOJJNHcMit",
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "Essentials Grocery",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (paymentResponse) {
            try {
              await axios.post(
                "http://localhost:5001/api/payment/verify",
                {
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                  order_id: order_id,
                }
              );

              // Show success popup with order ID
              setOrderId(order_id);
              setShowSuccessPopup(true);
              await clearCart();
            } catch (error) {
              console.error("Payment verification failed:", error);
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: "",
          },
          theme: {
            color: "#4CAF50",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      };
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to create order");
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (useSavedAddress && !selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!useSavedAddress && (!formData.address || !formData.city || !formData.pincode)) {
      toast.error("Please fill in all address fields");
      return;
    }

    setLoading(true);

    try {
      const shippingAddress = useSavedAddress 
        ? {
            name: formData.name,
            email: formData.email,
            address: selectedAddress.address_line,
            city: selectedAddress.city,
            pincode: selectedAddress.pincode,
          }
        : {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,
            state: formData.state,
          };

      const orderData = {
        user_id: user.id,
        products: cart.map((item) => ({
          product_id: item.product_id || item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        total_amount: total,
        order_status: "pending",
        payment_method: "COD",
        shipping_details: shippingAddress,
      };

      const response = await axios.post("http://localhost:5001/api/payment/create-cod", orderData);

      // Use the actual database order ID
      setOrderId(response.data.order_id);
      setShowSuccessPopup(true);
      await clearCart();
    } catch (error) {
      console.error("COD order failed:", error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    setOrderId(null);
    navigate("/");
  };

  const placeOrder = () => {
    // Validate form before placing order
    if (!validateForm()) {
      return;
    }
    
    if (formData.payment === "COD") {
      handleCODOrder();
    } else {
      handleRazorpayPayment();
    }
  };

  const canPlaceOrder = () => {
    if (loading) return false;
    if (useSavedAddress) return !!selectedAddress;
    return !!(formData.address && formData.city && formData.pincode);
  };

  return (
    <div className="checkout-container">
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order.</p>
            {orderId && <p className="order-id">Order ID: {orderId}</p>}
            <p className="success-message">
              {formData.payment === "COD" 
                ? "Your order will be delivered soon. Payment will be collected on delivery."
                : "Your payment was successful!"}
            </p>
            <button className="popup-close-btn" onClick={handlePopupClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> /<Link to="/Checkout">Checkout</Link>
      </div>

      <div className="checkout-grid">
        <div className="checkout-left">
          <h2>Shipping Details</h2>

          {/* Saved Address Option */}
          {addresses.length > 0 && (
            <div className="saved-address-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={useSavedAddress}
                  onChange={handleUseSavedAddress}
                />
                <span>Use my saved details</span>
              </label>
              
              {useSavedAddress && (
                <div className="default-address-section">
                  {selectedAddress ? (
                    <div className="current-address">
                      <p className="address-line">{selectedAddress.address_line}</p>
                      <p className="address-city">{selectedAddress.city} - {selectedAddress.pincode}</p>
                      <button
                        className="change-address-btn"
                        onClick={() => setShowAddressSelector(!showAddressSelector)}
                      >
                        Change Address
                      </button>
                    </div>
                  ) : (
                    <div className="no-address">
                      <p>No address found.</p>
                    </div>
                  )}
                </div>
              )}

              {useSavedAddress && showAddressSelector && (
                <div className="address-selector">
                  <h3>Select Address</h3>
                  {addresses.map((addr) => (
                    <div
                      key={addr.address_id}
                      className={`address-option ${selectedAddress?.address_id === addr.address_id ? "selected" : ""}`}
                      onClick={() => handleAddressChange(addr)}
                    >
                      <p>{addr.address_line}</p>
                      <p>{addr.city} - {addr.pincode}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Manual Address Fields */}
          {!useSavedAddress && (
            <div className="manual-address-fields">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error-input" : ""}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-field">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-field">
                <textarea
                  placeholder="Delivery Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={errors.address ? "error-input" : ""}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="address-row">
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "error-input" : ""}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    className={errors.pincode ? "error-input" : ""}
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>
              </div>

              <input
                type="text"
                placeholder="State (Optional)"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Show manual entry option when no saved addresses */}
          {addresses.length === 0 && (
            <div className="manual-address-fields">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <textarea
                placeholder="Delivery Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />

              <div className="address-row">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                placeholder="State (Optional)"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          )}

          <h3>Payment Method</h3>

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Razorpay">Online Payment (Razorpay)</option>
          </select>

          <button
            className="place-order-btn"
            onClick={placeOrder}
            disabled={loading || !canPlaceOrder()}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        <div className="checkout-right">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-item" key={item.product_id || item.id}>
              <div>
                <p>{item.name}</p>
                <small>
                  {item.quantity} x Rs.{item.price}
                </small>
              </div>
              <span>Rs.{(item.price || 0) * (item.quantity || 0)}</span>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <p>Subtotal</p>
            <span>Rs.{subtotal}</span>
          </div>

          <div className="summary-row">
            <p>Delivery</p>
            <span>
              {deliveryCharge === 0 ? "Free" : `Rs.${deliveryCharge}`}
            </span>
          </div>

          <div className="summary-total">
            <p>Total</p>
            <span>Rs.{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

