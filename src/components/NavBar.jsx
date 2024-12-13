
import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <span className="material-icons">home</span>
          Home
        </NavLink>
        <NavLink 
          to="/account" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <span className="material-icons">account_circle</span>
          Account
        </NavLink>
        <NavLink 
          to="/myprofile" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <span className="material-icons">person</span>
          My Profile
        </NavLink>
      </div>
      <div className="nav-right">
        <span className="material-icons nav-icon" tabIndex={0}>notifications</span>
        <span className="material-icons nav-icon" tabIndex={0}>settings</span>
        <span className="material-icons nav-profile">person</span>
      </div>
    </nav>
  );
};

export default Navbar;
