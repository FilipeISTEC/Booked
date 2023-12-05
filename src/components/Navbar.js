import "../assets/styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Booked</h1>
      <div className="links">
        <Link
          to="/"
          style={{
            color: "#34A38F",
          }}
        >
          Home
        </Link>

        <Link
          to="/About"
          style={{
            color: "#34A38F",
          }}
        >
          About
        </Link>

        <Link
          to="/Contact"
          style={{
            color: "#34A38F",
          }}
        >
          Contact
        </Link>

        <Link
          to="/Login "
          style={{
            color: "white",
            backgroundColor: "#34A38F",
            borderRadius: "5px",
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
