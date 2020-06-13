import React, {Component} from 'react';
import {
  Row, 
  Col,
  Form,
  Button
 } from 'react-bootstrap'
 import { Link, Redirect } from 'react-router-dom';
 import qs from 'querystring'
 import Swal from 'sweetalert2'
 import brand from '../assets/img/bookshelf.png'
 import axios from 'axios'
const {REACT_APP_URL} = process.env



class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
        email: '',
        password: '',
        loggedIn: false,
        isLoading: false
    }
    this.handlePost = this.handlePost.bind(this)
     // check auth flow
     this.checkToken = () => {
      if(!localStorage.getItem('user')){
          props.history.push('/login')
      } else {
        const user = JSON.parse(localStorage.getItem('user'));
        Swal.fire({
          title: 'Welcome !',
          text: user.userData.email,
          icon: 'info',
        })
          props.history.push('/dashboard')
      }
    }
    this.baseState = this.state 
}

resetForm = () => {
  this.setState(this.baseState)
}

handleChange = event => {
    this.setState({[  event.target.name]: event.target.value})
}

handlePost = async (event) => {
    event.preventDefault()
      this.setState({isLoading: true})
      const userData = {
          email: this.state.email,
          password: this.state.password
      }
      const url = `${REACT_APP_URL}auth/`
     await axios.post(url, qs.stringify(userData)).then( (response) => {
          Swal.fire({
            title: 'Done !',
            text: response.data.message,
            icon: 'success',
            timer: 2000
          })
          this.setState({ redirect: this.state.redirect === false });
        
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.props.history.push('/dashboard')
        }
        })
        .catch(function (error) {
          console.log(error.response);
          Swal.fire({
            title: 'Done !',
            text: error.response.data.message,
            icon: 'warning',
            timer: 2000
          })
        }) 
     await this.resetForm()
}
        async componentDidMount(){
           await this.checkToken()
       }
      
    render(){
      const {isLoading} = this.state
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
                          <Button variant="primary" type="submit" disabled={isLoading}>
                            Login
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