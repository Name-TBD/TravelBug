import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token')));
    };

    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('auth-change', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('auth-change', syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('auth-change'));
  };

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
        {isLoggedIn && (
          <button className="nav-link" onClick={handleLogout} type="button">
            Log Out
          </button>
        )}
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
