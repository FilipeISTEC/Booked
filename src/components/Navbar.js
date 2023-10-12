import {Link} from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Booked</h1>
        <div className="links">

          <Link to="/" style={{
            color: "green"
          }}>Home</Link>

          <a href="/" style={{
            color: "green"
          }}>About</a>

          <a href="/" style={{
            color: "green"
          }}>Contact</a>

          <a href="/login" style={{ 
            color: 'white', 
            backgroundColor: '#45936C',
            borderRadius: '5px' 
          }}>Login</a>

        </div>
      </nav>
    );
  }
   
  export default Navbar;