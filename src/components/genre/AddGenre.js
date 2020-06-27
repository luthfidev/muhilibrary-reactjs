import React, { Component } from 'react'
import {Modal, 
        Button, 
        Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

import { postgenres } from '../../redux/actions/genre'

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

class AddGenre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameValid: false,
            alert: '',
            formValid: false,
            errorMsg: {},
        }
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
      const genreData = {
        name: this.state.name
      }
     this.props.postgenres(genreData)
     .then(response => {
      Swal.fire({
        title: 'Done !',
        text: this.props.genres.successMsg,
        icon: 'success',
        timer: 2000
      })
    })
    .catch(err => {
      Swal.fire({
        title: 'Done !',
        text: this.props.genres.errorMsg,
        icon: 'danger',
        timer: 2000
      })
    });
      this.props.refreshdata()
      this.props.onHide()
    }

    render() {
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
                Add Genre
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={this.handlePost}>
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

// export default AddGenre
const mapStateToProps = (state) => ({
  genres: state.genres
})
const mapDispatchToProps = {
  postgenres,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGenre)