import React from 'react';
import { NavLink } from 'react-router-dom';

function TabBar() {
  return (
    <nav className="tab-bar">
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}
        end // Pastikan 'end' agar tidak aktif di rute turunan
      >
        Penjadwalan
      </NavLink>
      <NavLink 
        to="/kelola" 
        className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}
      >
        Pengelolaan
      </NavLink>
      <NavLink 
        to="/ringkasan" 
        className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}
      >
        Ringkasan
      </NavLink>
    </nav>
  );
}

export default TabBar;