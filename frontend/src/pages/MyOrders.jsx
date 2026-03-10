import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './MyOrders.css';
const API = "https://grocery-website-bjbz.onrender.com";

const parseProducts = (products) => {
  if (!products) return [];
  if (Array.isArray(products)) return products;
  if (typeof products === 'string') {
    try {
      return JSON.parse(products);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const MyOrders = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${API}/api/payment/orders/${user.id}`
      );
      if (response.data.success) {
        // Sort orders: confirmed/pending first, then delivered, then cancelled at bottom
        const sortedOrders = response.data.orders.sort((a, b) => {
          const aStatus = a.order_status;
          const bStatus = b.order_status;
          
          // Cancelled goes to bottom
          if (aStatus === 'cancelled' && bStatus !== 'cancelled') return 1;
          if (bStatus === 'cancelled' && aStatus !== 'cancelled') return -1;
          
          // Delivered goes below pending/confirmed
          if (aStatus === 'delivered' && (bStatus === 'pending' || bStatus === 'confirmed')) return 1;
          if (bStatus === 'delivered' && (aStatus === 'pending' || aStatus === 'confirmed')) return -1;
          
          // Keep original order for same status
          return b.order_id - a.order_id;
        });
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(
        `${API}/api/payment/cancel-order`,
        { order_id: selectedOrderId, user_id: user.id }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setShowCancelModal(false);
        setCancelReason('');
        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const canCancel = (status) => {
    return status === 'pending' || status === 'confirmed';
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#10b981';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="myorders-loading">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="myorders-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/account">Account</Link> / <Link to="/myorders"> My Orders</Link>
      </div>

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/shop" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <div className="orders-list-simple">
          {orders.map((order) => (
            <div key={order.order_id} className="order-card-simple">
              <div className="order-header-simple">
                <div className="order-id-row">
                  <span className="order-id-label">Order ID:</span>
                  <span className="order-id-value">#{order.order_id}</span>
                </div>
                <span 
                  className="order-status-badge"
                  style={{ backgroundColor: getStatusColor(order.order_status) }}
                >
                  {getStatusLabel(order.order_status)}
                </span>
              </div>

              <div className="order-items-simple">
                {parseProducts(order.products).map((product, index) => (
                  <div key={index} className="order-item-simple">
                    <span className="item-name">{product.name}</span>
                    <span className="item-qty">x{product.quantity}</span>
                    <span className="item-price">Rs.{product.price * product.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer-simple">
                <div className="order-total-simple">
                  <span>Total:</span>
                  <span className="total-amount">Rs.{order.total_amount}</span>
                </div>
                {canCancel(order.order_status) && (
                  <button 
                    className="cancel-btn-simple"
                    onClick={() => openCancelModal(order.order_id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cancel Order</h2>
            <p>Are you sure you want to cancel this order?</p>
            <p className="modal-note">If you already paid your Refund will be processed within 3-5 business days.</p>
            <textarea
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="modal-actions">
              <button 
                className="modal-cancel-btn"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
              >
                Keep Order
              </button>
              <button 
                className="modal-confirm-btn"
                onClick={handleCancelOrder}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

