import "../assets/styles/Navbar.css"
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token') !== null; // Verifica se o token está presente no localStorage

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    window.location.replace('/');
  };
  return (
    <nav className="navbar">
      <h2>Booked</h2>
      <div className="links">
        <Link to="/" style={{ color: '#34A38F' }}>
          Home
        </Link>

        <Link to="/About" style={{ color: '#34A38F' }}>
          About
        </Link>

        <Link to="/Contact" style={{ color: '#34A38F' }}>
          Contact
        </Link>
        
        {isLoggedIn ? (
          <Link
            onClick={handleLogout} // Chama a função handleLogout ao clicar no botão
            style={{
              color: 'white',
              backgroundColor: '#34A38F',
              borderRadius: '5px',
            }}
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/Login"
            style={{
              color: 'white',
              backgroundColor: '#34A38F',
              borderRadius: '5px',
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
