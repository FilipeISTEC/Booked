import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {

    

  return (
    <div className="landing-page">
      <div className="header">
        <h1 className="app-name">Booked</h1>
      </div>
      <div className="content">
        <h2 className="welcome-text">Welcome to Booked</h2>
        <p className="description">A place where you can write your book review</p>
        <Link to="/" className="btn">Get Started</Link>
      </div>
    </div>
  );
}

export default LandingPage;
