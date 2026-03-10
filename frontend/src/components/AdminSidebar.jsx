import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./admin.css";
const API = "https://grocery-website-bjbz.onrender.com";
const AdminSidebar = ({ isOpen, setIsOpen }) => {

  const [notifications, setNotifications] = useState(null);
const [showDropdown, setShowDropdown] = useState(false);

useEffect(() => {
  fetchNotifications();
}, []);

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/admin/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setNotifications(data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/admin/categories" onClick={() => setIsOpen(false)}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" onClick={() => setIsOpen(false)}>
              Products
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/logout" onClick={() => setIsOpen(false)}>
              Log out
            </NavLink>
          </li> */}
          <li>
  <NavLink to="/admin/notifications" onClick={() => setIsOpen(false)}>
    Notifications
  </NavLink>
</li>
        </ul>
      </aside>
    </>
  );
};

export default AdminSidebar;
