import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Home
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Account
        </NavLink>
        <NavLink
          to="/myprofile"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          My Profile
        </NavLink>
        <NavLink
          to="/all-posts"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          All Posts
        </NavLink>
      </div>
      <div className="nav-right">
        <span className="material-icons nav-icon" tabIndex={0}>
          notifications
        </span>
        <span className="material-icons nav-icon" tabIndex={0}>
          settings
        </span>
        <span className="material-icons nav-profile">person</span>
      </div>
    </nav>
  );
};

export default Navbar;