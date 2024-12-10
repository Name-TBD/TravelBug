
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/account">Account</Link>
        <Link to="/myprofile">MyProfile</Link>
        <Link to="/feed">Feed</Link>
    </nav>
  )
}

export default NavBar