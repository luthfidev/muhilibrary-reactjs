import React, {Component} from 'react';
import {Row, 
        Col,
        Form,
        Button,
        Spinner} from 'react-bootstrap' 
import {Link} from 'react-router-dom';
import qs from 'querystring'
import Swal from 'sweetalert2'
import brand from '../assets/img/bookshelf.png'
import {Register} from '../components/Register' 
import axios from 'axios'
const  {REACT_APP_URL } = process.env
 
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
        data:[],
        email: '', emailValid: false,
        password: '', passwordValid: false,
        loggedIn: false,
        isLoading: false,
        addModalShow : false,
        errorMsg: {},
        formValid: false
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
    this.handlePost = this.handlePost.bind(this)
    this.baseState = this.state 
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
      
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        this.props.history.push('/dashboard')
      }
      })
      .catch(function (error) {
          if(typeof error.response !== 'undefined'){
          Swal.fire({
            title: 'Warning !',
            text: error.response,
            icon: 'warning',
            timer: 2000
          })
        } else {
          Swal.fire({
            title: 'Warning !',
            text: 'Error',
            icon: 'warning',
            timer: 2000
          })
        }
      }) 
      this.setState({isLoading: false})
    this.resetForm()
}
    async componentDidMount(){
        await this.checkToken()
    }

  /*   componentWillUnmount(){
      this.checkToken()
    } */
      
    render(){
      let addModalClose = () => this.setState({addModalShow:false})
      const {formValid, isLoading} = this.state
        return(
        <>
          <Row className="h-100 no-gutters">
          <Register
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
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
                          <img alt="brand" className="ml-auto mr-3 mt-2" src={brand}/>
                      </div>
                      </Link>
                      <div className="h-75 m-4 d-flex justify-content-center align-items-center">
                        <Form onSubmit={ this.handlePost}>
                        <h1>Login</h1>
                          <p>Welcome Back, Please Login to your account</p>
                          <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            <ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />

                            </Form.Text>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)} type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                            < ValidationMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="d-flex justify-content-between">
                            <Form.Check type="checkbox" label="Check me out" />
                            <Link to="/register" className="text-decoration-none"> Forgot Password</Link>
                          </Form.Group>
                          <Button variant="primary" type="submit" disabled={isLoading || !formValid}>
                          {isLoading &&(
                          <Spinner 
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />)} Login
                          </Button>
                          <Link onClick={()=> this.setState({addModalShow: true})} className="ml-2 btn btn-outline-info">Register</Link>
                          <Link to="/" className="ml-2 btn btn-outline-dark">Back</Link>
                        </Form>
                      </div>
                      <Col className="footer-login d-flex justify-content-center align-content-center">
                        <div>
                        <div>By signing up, you agree to Book’s</div>
                        <Link to="#"> Terms and Conditions</Link> & 
                        <Link to="#"> Privacy Policy</Link>
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