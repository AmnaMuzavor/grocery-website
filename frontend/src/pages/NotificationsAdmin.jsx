import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../components/admin.css";
const API = "https://grocery-website-bjbz.onrender.com";

export default function NotificationsAdmin() {

  const [notifications, setNotifications] = useState({
    lowStockProducts: [],
    pendingOrders: [],
    failedPayments: []
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "${API}/api/admin/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        setNotifications(data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="content">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          Actions
        </button>

        {/* <h2 className="nheading">Notifications</h2> */}

       
        <h3 className="nsubheading">Low Stock Products</h3>
        {notifications.lowStockProducts.length === 0 ? (
          <p>No low stock products</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock Left</th>
              </tr>
            </thead>
            <tbody>
              {notifications.lowStockProducts.map((p) => (
                <tr key={p.product_id}>
                  <td>{p.name}</td>
                  <td>{p.stock_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

       
        <h3 className="nsubheading" >Pending Orders</h3>
        {notifications.pendingOrders.length === 0 ? (
          <p>No pending orders</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {notifications.pendingOrders.map((o) => (
                <tr key={o.order_id}>
                  <td>{o.order_id}</td>
                
                  <td>{o.User?.name}</td>
                  <td>₹{o.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3 className="nsubheading" >Failed Payments</h3>
        {notifications.failedPayments.length === 0 ? (
          <p>No failed payments</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.failedPayments.map((p) => (
                <tr key={p.payment_id}>
                  <td>{p.order_id}</td>
                  <td>{p.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </main>
    </div>
  );
}
