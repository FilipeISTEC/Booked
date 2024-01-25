import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css';
import $ from 'jquery';
import logo from '../assets/images/Login.png'; // Replace 'path_to_your_logo' with the actual path to your logo image file


const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    //---------------------------------Troca de lado Login--------------------------------
    useEffect(() => {
        $('#signup').click(function() {
            $('.overbox').css('transform', 'translateX(80%)');
            $('.signin').addClass('nodisplay');
            $('.signup').removeClass('nodisplay');
        });

        $('#signin').click(function() {
            $('.overbox').css('transform', 'translateX(0%)');
            $('.signup').addClass('nodisplay');
            $('.signin').removeClass('nodisplay');
        });
    }, []);
    //------------------------------------------------------------------------------------------------
    function handleLogin(e) {
        e.preventDefault();
        const url = '';  // ou a URL correta do seu backend
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
    }
    
    return (
        <div className="login-card">
            <div className="logo-container" style={{ display: 'flex', alignItems: 'center', height: '80vh', justifyContent: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '50%', height: '' }}/>
            </div>
            <div className="form-container">
        <div className="container">
            <div className="welcome">
                <div className="overbox">
                    <div className="signup nodisplay">
                        <h1>Sign up</h1>
                        <form autoComplete="off">
                            <input type="text" name="username" placeholder="Username" />
                            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button className="button submit" type="button">Create Account</button>
                        </form>
                    </div>
                    <div className="signin">
                        <h1>Sign in</h1>
                        <form className="login-form">
                            <div className="username">
                                <input
                                    autoComplete="off"
                                    spellCheck="false"
                                    className="control"
                                    type="text"
                                    placeholder="Username"
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                />
                                <div id="spinner" className="spinner"></div>
                            </div>
                            <input
                                name="password"
                                spellCheck="false"
                                className="control"
                                type="text"
                                placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="control" type="submit" onClick={handleLogin}>ENTER</button>
                        </form>
                    </div>
                </div>
                <div className="leftbox">
                    <h2 className="title">BOO<span>KED</span></h2>
                    <p className="desc">The perfect book <br></br><span> for the perfect time</span></p>
                    
                    <p className="account">have an account?</p>
                    <button className="button" id="signin">login</button>
                </div>
                <div className="rightbox">
                <h2 className="title">BOO<span>KED</span></h2>
                <p className="desc">The perfect book <br></br><span> for the perfect time</span></p>
                    <p className="account">don't have an account?</p>
                    <button className="button" id="signup">sign up</button>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Login;

