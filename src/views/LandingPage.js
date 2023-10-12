import "../assets/styles/Landing.css"
import React from 'react';
import {Link} from "react-router-dom";
function LandingPage() {


  return (
    <div className="landing">
      <div className="top">
        <h1>Booked</h1>
      </div>
      <div className="rest">
        <h1>Welcome to <span className="colored-text">Booked</span></h1>
        <h3>A place where you can write your book review</h3>
       <Link to ="/" className='btngohome'>Enter Website</Link>
      </div>
    </div>
  );
}

export default LandingPage;
