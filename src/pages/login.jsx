import React, {Component} from 'react';
import {
  Row, 
  Col,
  Form,
  Button
 } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import brand from '../assets/img/bookshelf.png'

class Login extends Component {
    render(){
        return(
        <>
          <Row className="h-100 no-gutters">
              <Col md={8} className="bg-login">
                  <div className="text w-100 h-100 ml-3 d-flex flex-column justify-content-between">
                    <div className="bg-text-login">
                      <h1 className="text-white">Book is a window to the world</h1>
                    </div>
                    <div className="bg-text-watermark">
                      <p className="text-white">Photo by Mark Pan4ratte on Unplash</p>
                    </div>
                  </div>
              </Col>
              <Col md={4} className="h-100">
                  <div className="content-login h-100">
                      <div className="brand d-flex">
                          <img alt="brand" className="ml-auto mr-3 mt-2" src={brand}/>
                      </div>
                      <div className="h-75 m-4 d-flex justify-content-center align-items-center">
                        <Form >
                        <h1>Login</h1>
                          <p>Welcome Back, Please Login to your account</p>
                          <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                          <Form.Group className="d-flex justify-content-between">
                            <Form.Check type="checkbox" label="Check me out" />
                            <Link to="/register" className="text-decoration-none"> Forgot Password</Link>
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                          <Link to="/register" className="ml-2 btn btn-outline-dark"> Sign Up</Link>
                        </Form>
                      </div>
                      <Col className="footer-login d-flex justify-content-center align-content-center">
                        <div>
                        <div>By signing up, you agree to Book’s</div>
                        <Link to="/register"> Terms and Conditions</Link> & 
                        <Link to="/register"> Privacy Policy</Link>
                        </div>
                      </Col>
                  </div>
              </Col>
          </Row>
        </>
    );
    }
}

export default Login