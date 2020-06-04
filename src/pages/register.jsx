import React, {Component} from 'react';

class Register extends Component {
    render() { 
        return(
            <>
            <div className="register">
                <div className="register-bg">
                    <div className="text">
                        <div className="bg-text">
                            <h1>Book is a window to the world</h1>
                        </div>
                        <div className="bg-watermark">
                            <p>Photo by Mark Pan4ratte on Unsplash</p>
                        </div>
                    </div>
                </div>
                <div className="register-content">
                    <div className="logo">
                        <div className="brand">
                            <img alt="bookshelf" src={require("../assets/img/bookshelf.png")}/>
                        </div>
                    </div>
                    <div className="form">
                        <div className="text-register">
                            <h1>Register</h1>
                            <p>Welcome Back, Please Register to create account</p>
                        </div>
                        <form>
                            <div className="input">
                                <div className="field">
                                    <input type="email" placeholder="Username"/>
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Full Name"/>
                                </div>
                                <div className="field">
                                    <input type="email" placeholder="Email"/>
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="submit">
                                <button className="btn-register">Sign Up</button>
                                <a href="/" className="btn-login">Login</a>
                            </div>
                        </form>

                    </div>
                    <div className="footer">
                        <div className="footer-1">
                            <h4>By signing up, you agree to book's</h4>
                        </div>
                        <div className="footer-2">
                            <p>
                                <a href="#">Term and Condition</a> & <a href="#">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Register