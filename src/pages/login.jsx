import React, {Component} from 'react';

class Login extends Component {
    render(){
        return(
        <>
        <div className="login">
            <div className="login-bg">
                <div className="text">
                    <div className="bg-text">
                        <h1>Book is a window to the world</h1>
                    </div>
                    <div className="bg-watermark">
                        <p>Photo by Mark Pan4ratte on Unsplash</p>
                    </div>
                </div>
            </div>
            <div className="login-content">
            <div className="logo">
                <div className="brand">
                    <img src={require("../assets/img/bookshelf.png")}/>
                </div>
            </div>
            <div className="form">
                <div className="text-login">
                    <h1>Login</h1>
                    <p>Welcome Back, Please Login to your account</p>
                </div>
                <form>
                    <div className="input">
                        <div className="field">
                            <input type="email" placeholder="Email"/>
                        </div>
                        <div className="field">
                            <input type="password" placeholder="password"/>
                        </div>
                    </div>
                    <div className="tnc">
                        <div className="remember">
                            <input type="checkbox"/>
                            <label>Remember me</label>
                        </div>
                        <div className="forgot">
                            <a href="#">Forgot Password</a>
                        </div>
                    </div>
                    <div className="submit">
                        <button className="btn-login">Login</button>
                        <a href="#" className="btn-signup">Signup</a>
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
    );
    }
}

export default Login