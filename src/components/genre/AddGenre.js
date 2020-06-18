import React, { Component } from 'react'
import {Modal, 
        Button, 
        Form} from 'react-bootstrap'
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

export class AddGenre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            alert: '',
            formValid: false,
            errorMsg: {},
        }
        this.handlePost = this.handlePost.bind(this)
    }
    
    validateForm = () => {
      const {nameValid} = this.state;
      this.setState({
        formValid: nameValid 
      })
    }

    updateName = (name) => {
      this.setState({name}, this.validateName)
    }

    validateName = () => {
      const {name} = this.state;
      let nameValid = true;
      let errorMsg = {...this.state.errorMsg}
  
      if (name.length < 3) {
        nameValid = false;
        errorMsg.name = 'Must be at least 3 characters long'
      } else if (name.length > 25) {
        nameValid = false;
        errorMsg.name = 'Too long characters'
      }

      this.setState({nameValid, errorMsg}, this.validateForm)
    }

    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }
       handlePost = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        const genreData = {
            name: this.state.name
        }
        const url = `${REACT_APP_URL}genres`
        axios.post(url, genreData).then( (response) => {
            this.setState({Msg: response.data.message})
            Swal.fire({
              title: 'Done !',
              text: this.state.Msg,
              icon: 'success',
              timer: 2000
            })
            this.setState({ redirect: this.state.redirect === false });
          })
          .catch(function (error) {
           }) 
           this.props.refreshdata()
           this.props.onHide()
    }
   
       
    render(){
      const {formValid} = this.state
        return(
            <Modal
            {...this.props}
            size="lg"
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
                    <Form.Label>Name Genre</Form.Label>
                    <Form.Control name="name" value={this.state.name} onChange={(e) => this.updateName(e.target.value)} type="text" placeholder="Name Genre" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.nameValid} message={this.state.errorMsg.name} />
                    </Form.Text>
                </Form.Group>
                <Button disabled={!formValid} variant="primary" type="submit">
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