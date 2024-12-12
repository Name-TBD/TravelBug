
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/myprofile">MyProfile</Link>
       
    </nav>
  )
}

export default Navbar

/*

 <Link to="/postcatalogue">Posts</Link>
 
 <Link to="/login">Login</Link>
<Link to="/register">Register</Link>
  <Link to="/feed">Feed</Link>
  */