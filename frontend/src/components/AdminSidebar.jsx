import React from 'react';
import { NavLink } from 'react-router-dom';
import './admin.css';

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? 'active' : ''}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/logout" className={({ isActive }) => isActive ? 'active' : ''}>
            Log out
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
