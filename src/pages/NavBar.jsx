//Navbar lets user select homepage or account for login/registration
//The Travel Catalogue link is a placeholder and need to be connected to Faker's travel imagery

import { Link } from 'react-router-dom';

const NavBar = ({ logOutButton }) => {
  return (
    <>
      <nav id="navbar">
        <Link to="/">Home</Link>
        <Link to="/travelcatalog">Travel Catalogue</Link>   
        <Link to="/accountdetails">Account</Link>
        {logOutButton}
      </nav>
    </>
  );
};

export default NavBar;