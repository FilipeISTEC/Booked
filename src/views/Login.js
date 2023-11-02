import React, { useEffect } from 'react';
import '../assets/styles/Login.css';
import $ from 'jquery';
import logo from '../assets/images/Login.png'; // Replace 'path_to_your_logo' with the actual path to your logo image file


const Login = () => {
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
                            <input type="text" placeholder="Username" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <input type="password" placeholder="Confirm password" />
                            <button className="button submit">Create account </button>
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

                            />

                            <button className="control" type="button">JOIN NOW</button>
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

