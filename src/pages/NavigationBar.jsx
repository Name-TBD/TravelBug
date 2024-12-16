import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/account">Account</Link>
      <Link to="/myprofile">My Profile</Link>
      <Link to="/all-posts">All Posts</Link>
    </nav>
  );
};

export default NavigationBar;
