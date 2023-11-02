import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import '../assets/styles/Logincopy.css';
import logo from '../assets/images/Login.png'; // Replace 'path_to_your_logo' with the actual path to your logo image file

const strengthPassword = ["Weak", "Medium", "Strong"];

const Signup = () => {
  const [strength, setStrength] = useState("");

  const getStrength = (password) => {   //Barra de segurança da password (facil dificil medio)
    console.log(password);
    let strengthIndicator = -1;
    let upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }

      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }

      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }

    setStrength(strengthPassword[strengthIndicator] || "");
  };

  const handleChange = (event) => getStrength(event.target.value);

  return (
    
    <div className="login-card">
      <img src={logo} alt="Logo" />
      <h2>Sign Up</h2>
      <form className="login-form">
        <div className="username">
          <input
            autoComplete="off"
            spellCheck="false"
            className="control"
            type="email"
            placeholder="Email"
          />
          <div id="spinner" className="spinner"></div>
        </div>
        <input
          name="password"
          spellCheck="false"
          className="control"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <div className={`bars ${strength}`}>
          <div></div>
        </div>
        <div className="strength">{strength && <>{strength} password</>}</div>
        <button className="control" type="button">
          JOIN NOW
        </button>
      </form>
    </div>
  );
};

export default Signup;
