import "../assets/styles/Navbar.css"
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Booked</h1>
        <div className="links">

          <Link to="/" style={{
            color: "green"
          }}>Home</Link>

          <Link to="/About" style={{
            color: "green"
          }}>About</Link>

          <Link to="/Contact" style={{
            color: "green"
          }}>Contact</Link>

          <Link to="/Login " style={{ 
            color: 'white', 
            backgroundColor: '#45936C',
            borderRadius: '5px' 
          }}>Login</Link>

        </div>
      </nav>
    );
  }
   
  export default Navbar;