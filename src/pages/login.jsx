import React, {Component} from 'react';
import {
  Row, 
  Col,
  Form,
  Spinner,
} from 'react-bootstrap' 
import {Link, withRouter, Redirect} from 'react-router-dom';
import Swal from 'sweetalert2'
import brand from '../assets/img/bookshelf.png'
import {Register} from '../components/Register' 
import { connect } from 'react-redux'
import Spiner from '../components/Loader'

import { login } from '../redux/actions/auth'
 
function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg text-danger'>{props.message}</div>
    )
  } else {
    return(
      <div className='error-msg text-success'>Look Goods!</div>
    )
  }
}

 class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email: '', emailValid: false,
        password: '', passwordValid: false,
        loggedIn: false,
        addModalShow : false,
        errorMsg: {},
        formValid: false,
        isLoading: false,
    }
    this.baseState = this.state 
    if (this.props.auth.token) {
      this.props.history.push('/dashboard') 
  }
}

resetForm = () => {
  this.setState(this.baseState)
}

handleChange = event => {
    this.setState({[  event.target.name]: event.target.value})
}

validateForm = () => {
  const {emailValid, passwordValid} = this.state;
  this.setState({
    formValid: emailValid && passwordValid,
  })
}

updateEmail = (email) => {
  this.setState({email}, this.validateEmail)
}

validateEmail = () => {
  const {email} = this.state;
  let emailValid = true;
  let errorMsg = {...this.state.errorMsg}

  if (email.length < 3) {
    emailValid = false;
    errorMsg.email = 'Must be at least 3 characters long'
  } else if (!email.includes('@')) {
    emailValid = false;
    errorMsg.email = 'Invalid Email'
  }

  this.setState({emailValid, errorMsg}, this.validateForm)
}

updatePassword = (password) => {
  this.setState({password}, this.validatePassword)
}

validatePassword = () => {
  const {password} = this.state;
  let passwordValid = true;
  let errorMsg = {...this.state.errorMsg}

  if (password.length < 4) {
    passwordValid = false;
    errorMsg.password = 'Must be at least 4 characters long'
  }

  this.setState({passwordValid, errorMsg}, this.validateForm)
}

handlePost = async (event) => {
  event.preventDefault()
  const { email, password } = this.state
  this.props.login(email, password)
  .then(response => {
    Swal.fire({
      title: 'Done !',
      text: 'Login Success !',
      icon: 'success',
      timer: 2000
    })
  })
  .catch(err => {
    Swal.fire({
      title: 'Login Failed',
      text: 'Someting Wrong !!',
      icon: 'danger',
      timer: 2000
    })
  });
  this.props.history.push('/dashboard') 
}

    
    render(){
      const {formValid } = this.state
      const { isLoading } = this.state

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
                      <Link to="/" className="text-decoration-none">
                      <div className="brand d-flex">
                          <img alt="brand" className="brand-img ml-auto mr-3 mt-2" src={brand}/>
                      </div>
                      </Link>
                      <div className="h-75 m-4 d-flex justify-content-center align-items-center">
                        <div className="card-login">
                            <div className="card-login-title d-flex justify-content-center mt-2">
                                <h2>Login</h2>
                                </div>
                                <form className="card-form-login w-100" onSubmit={ this.handlePost}>
                                  <div className="d-flex flex-column d-flex align-items-center justify-content-center">                         
                                    <div className="field  mt-4 mb-3">
                                        <input name="email" readOnly={isLoading} type="text" value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} placeholder="Email"/>
                                        <Form.Text className="text-muted">
                                          <ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
                                        </Form.Text>
                                    </div>
                                    <div className="field mt-2">
                                        <input name="password" readOnly={isLoading} type="password" value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)} placeholder="Password"/>
                                        <Form.Text className="text-muted">
                                          <ValidationMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
                                        </Form.Text>
                                    </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-5">
                                        <button className="btn-login text-danger" disabled={isLoading || !formValid}>
                                        {isLoading &&(
                                        <Spinner 
                                          as="span"
                                          animation="border"
                                          size="sm"
                                          role="status"
                                          aria-hidden="true"
                                        />)} Login</button>
                                    </div>
                                </form>
                        </div>
                      </div>
                      <Col className="footer-login d-flex justify-content-center align-content-center">
                        <div>
                        <div className="mb-2">Don't have account ? <Link className="text-teal" to="/register">Register</Link></div>
                        <Link className="text-decoration-none" to="#"> Terms and Conditions</Link> & 
                        <Link className="text-decoration-none" to="#"> Privacy Policy</Link>
                        </div>
                      </Col>
                  </div>
              </Col>
          </Row>
        </>
    );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))