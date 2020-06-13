import React, { Component } from 'react'
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
const {REACT_APP_URL} = process.env


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

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '', emailValid: false,
            password: '', passwordValid: false,
            formValid: false,
            errorMsg: {},
            alert: ''
        }
        this.handlePost = this.handlePost.bind(this)
        this.baseState = this.state 
    }

    resetForm = () => {
        this.setState(this.baseState)
      }

      progress = () => {
        var completed = 30;
        var target = 30;
        var progress = Math.ceil(completed / target * 100);
        return (<ProgressBar now={progress} />)
      }

    validateForm = () => {
      const {emailValid, passwordValid} = this.state;
      this.setState({
        formValid: emailValid && passwordValid
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
  
      if (password.length < 3) {
        passwordValid = false;
        errorMsg.password = 'Must be at least 3 characters long'
      }
  
      this.setState({passwordValid, errorMsg}, this.validateForm)
    }

        handleChange = event => {
            this.setState({[  event.target.name]: event.target.value})
        }

       handlePost = async (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        const registerData = {
            email: this.state.email,
            password: this.state.password
        }
        const url = `${REACT_APP_URL}auth/signup`
       await axios.post(url, registerData).then( (response) => {
            console.log(response)
           Swal.fire({
              title: 'Done !',
              text: response.data.message,
              icon: 'success',
            })
           
            this.setState({ redirect: this.state.redirect === false });
          })
          .catch(function (error) {
             Swal.fire({
                title: 'Done !',
                text: error.response.data.message,
                icon: 'warning',
              }) 
           }) 

          await this.resetForm()
           this.props.onHide()
    }
       
    render(){
      
        return(
            <Modal
            {...this.props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Register for new User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required name="email" value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)} type="email" placeholder="Email" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.name} />
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name="password" value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)} type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                </Form>
                </div>
            </Modal.Body>
       {/*      <Modal.Footer>
              <Button varian="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer> */}
          </Modal>
       
        )
    }
}