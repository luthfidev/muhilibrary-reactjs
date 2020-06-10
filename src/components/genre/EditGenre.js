import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'

import axios from 'axios'
const {REACT_APP_URL} = process.env


export class EditGenre extends Component {
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
 
        const authorData = {
            name: this.state.name,
        }

        const url = `${REACT_APP_URL}genres/${this.props.genreid}`
        axios.patch(url, authorData).then( (response) => {

           
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
                Edit Genre
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID Genre</Form.Label>
                    <Form.Control 
                        name="id" 
                        readOnly 
                        onChange={this.handleChange} 
                        type="text" placeholder="ID Genre" 
                        defaultValue={this.props.genreid}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name Genre</Form.Label>
                    <Form.Control 
                        name="name" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Name Genre" 
                        defaultValue={this.props.genrename}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
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