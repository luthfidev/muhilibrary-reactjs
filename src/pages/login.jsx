import React, {Component} from 'react';
import {
  Row, 
  Col,
  Form,
  Button
 } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import brand from '../assets/img/bookshelf.png'



import axios from 'axios'
const {REACT_APP_URL} = process.env



class Login extends Component {


  constructor(props) {
    super(props)
    this.state = {
        email: '',
        password: '',
    }
    this.handlePost = this.handlePost.bind(this)
}


handleChange = event => {
    this.setState({[  event.target.name]: event.target.value})
}


handlePost = (event) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const authorData = {
        email: this.state.email,
        password: this.state.password
    }
    const url = `${REACT_APP_URL}auth/`
    axios.post(url, authorData).then( (response) => {
        console.log(response);
      /*   this.props.history.push('/author') */
    
      })
      .catch(function (error) {
        console.log(error);
  
        /*    console.log(response)
           console.log(response.data.message) */
       }) 
       
       this.props.history.push('/dashboards')
}

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
                        <Form onSubmit={ this.handlePost}>
                        <h1>Login</h1>
                          <p>Welcome Back, Please Login to your account</p>
                          <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
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