import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import { Link } from 'react-router-dom';

import brand from '../assets/img/bookshelf.png'

class Login extends Component {
    render(){
        return(
        <>
        <Row className='h-100 no-gutters'>
          <Col md={8} className='login-cover'>
            <div className='d-flex flex-column justify-content-between login-overlay w-100 h-100'>
              <h1 className='text-white'>Book is a window to the world</h1>
              <div className='text-white'>Photo by Mark Pan4ratte on Unsplash</div>
            </div>
          </Col>
          <Col md={4}>
            <div className='d-flex flex-column w-100 h-100'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={brand} alt='Logo' />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form>
                  <h1>Login</h1>
                  <p>Welcome Back, Please Login to your account</p>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Email</div>
                      <Input type='email' />
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label className='w-100'>
                      <div>Password</div>
                      <Input type='password' />
                    </Label>
                  </FormGroup>
                  <div className='d-flex flex-row justify-content-between'>
                    <FormGroup check>
                      <Label check>
                        <Input type='checkbox' />
                        <span>Remember Me</span>
                      </Label>
                    </FormGroup>
                    <div>Forgot Password</div>
                  </div>
                  <div className='mt-2'>
                    <Button>Login</Button>
                    <Link to="/register" className="ml-2 btn btn-outline-dark"> Sign Up</Link>
                  </div>
                </Form>
              </div>
              <div className='d-flex flex-column align-content-center p-5'>
                <div>By signing up, you agree to Book’s</div>
                <div><p>Terms and Conditions &amp; Privacy Policy</p></div>
              </div>
            </div>
          </Col>
        </Row>
        </>
    );
    }
}

export default Login