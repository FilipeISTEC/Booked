import React, { useEffect } from 'react';
import '../assets/styles/Login.css';
import $ from 'jquery';

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
                        <form className="more-padding" autoComplete="off">
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <div className="checkbox">
                                <input type="checkbox" id="remember" /><label htmlFor="remember">Remember me</label>
                            </div>
                            <button className="button submit">Login</button>
                        </form>
                    </div>
                </div>
                <div className="leftbox">
                    <h2 className="title">BOO<span>KED</span></h2>
                    <p className="desc">The perfect book <br></br><span> for the perfect time</span></p>
                    <img className="img smaller" src="https://png.pngtree.com/png-clipart/20230708/original/pngtree-book-knowledge-tree-reading-learning-illustration-png-image_9278452.png" alt="" />
                    
                    <p className="account">have an account?</p>
                    <button className="button" id="signin">login</button>
                </div>
                <div className="rightbox">
                <h2 className="title">BOO<span>KED</span></h2>
                <p className="desc">The perfect book <br></br><span> for the perfect time</span></p>
                    <img className="img" src="https://assets.stickpng.com/images/58e38a3b204d556bbd97b155.png" alt="" />
                    <p className="account">don't have an account?</p>
                    <button className="button" id="signup">sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Login;

