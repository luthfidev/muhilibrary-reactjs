import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


import SweetAlert from 'react-bootstrap-sweetalert'

import axios from 'axios'
const {REACT_APP_URL} = process.env


export class AddGenre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
        const genreData = {
            name: this.state.name
        }
        const url = `${REACT_APP_URL}genres`
        axios.post(url, genreData).then( (response) => {
            this.setState({addMsg: "User is successfully added to the database"})
            console.log(response)
          })
          .catch(function (error) {
            console.log(error.response);
           }) 
           this.props.refreshdata()
           this.props.onHide()
    }
   

       
    render(){
      
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
                    <Form.Control name="name" onChange={this.handleChange} type="text" placeholder="Name Genre" />
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
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