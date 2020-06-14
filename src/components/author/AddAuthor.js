import React, {Component} from 'react'
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

export class AddAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '', nameValid: false,
            description: '', descriptionValid: false,
            formValid: false,
            errorMsg: {},
            alert: ''
        }
        this.handlePost = this.handlePost.bind(this)
    }

    validateForm = () => {
      const {nameValid, descriptionValid} = this.state;
      this.setState({
        formValid: nameValid && descriptionValid
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
      }
  
      this.setState({nameValid, errorMsg}, this.validateForm)
    }


    updateDescription = (description) => {
      this.setState({description}, this.validateDescription)
    }

    validateDescription = () => {
      const {description} = this.state;
      let descriptionValid = true;
      let errorMsg = {...this.state.errorMsg}
  
      if (description.length < 3) {
        descriptionValid = false;
        errorMsg.description = 'Must be at least 3 characters long'
      }
  
      this.setState({descriptionValid, errorMsg}, this.validateForm)
    }

        handleChange = event => {
            this.setState({[  event.target.name]: event.target.value})
        }

       handlePost = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        const authorData = {
            name: this.state.name,
            description: this.state.description
        }
        const url = `${REACT_APP_URL}authors`
        axios.post(url, authorData).then( (response) => {
            this.setState({Msg: response.data.message})
            console.log(response)
            Swal.fire({
              title: 'Done !',
              text: this.state.Msg,
              icon: 'success',
              timer: 2000
            })
            this.setState({ redirect: this.state.redirect === false });
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
                    <Form.Label>Name Author</Form.Label>
                    <Form.Control name="name" value={this.state.name} onChange={(e) => this.updateName(e.target.value)} type="text" placeholder="Name Author" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.nameValid} message={this.state.errorMsg.name} />
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={this.state.description} onChange={(e) => this.updateDescription(e.target.value)} type="text" placeholder="Description" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.descriptionValid} message={this.state.errorMsg.description} />
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