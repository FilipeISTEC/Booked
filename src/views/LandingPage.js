import "../assets/styles/Landing.css"
import React from 'react';
import {Link} from "react-router-dom";
function LandingPage() {


  return (
    <div className="landing-page">
      <div className="header">
        <h1 className="app-name">Booked</h1>
      </div>
      <div className="content">
        <h1 className="welcome-text">Welcome to <span className="colored-text">Booked</span></h1>
        <h3 className="description">A place where you can write your book review</h3>
       <Link to ="/" className='btngohome'>Enter Website</Link>
      </div>
    </div>
  );
}

export default LandingPage;
