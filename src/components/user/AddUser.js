import React, {Component} from 'react'
import {Modal, 
        Button, 
        Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
const {REACT_APP_URL} = process.env


/* function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg text-danger'>{props.message}</div>
    )
  } else {
    return(
      <div className='error-msg text-success'>Look Goods!</div>
    )
  }
} */

export class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '', 
            email: '', 
            password: '', 
            roleid: '', 
            formValid: false,
            errorMsg: {},
            alert: ''
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            roleid: this.state.roleid,
        }
        const url = `${REACT_APP_URL}users`
        axios.post(url, authorData).then( (response) => {
            Swal.fire({
              title: 'Done !',
              text: response.data.message,
              icon: 'success',
              timer: 2000
            })
          })
          .catch(function (error) {
           }) 
           this.props.refreshdata()
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
                Add Author
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name </Form.Label>
                    <Form.Control name="name" onChange={(e) => this.handleChange(e)}  type="text" placeholder="Name " />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" onChange={(e) => this.handleChange(e)}  type="text" placeholder="Email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={(e) => this.handleChange(e)}  type="password" placeholder="password" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                    <Form.Control as="select" name="roleid" onChange={(e) => this.handleChange(e)} custom>
                    <option>Select</option>
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button varian="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
       
        )
    }
}