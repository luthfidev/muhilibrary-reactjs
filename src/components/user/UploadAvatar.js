import React, { Component } from 'react'
import {Modal, 
        Button, 
        Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'

import { uploadavatar } from '../../redux/actions/user'

class UploadAvatar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
          },
            name: '',
            alert: ''
        }
    }
    
     handlePost = async (event) => {
        event.preventDefault()
        const { token } = this.props.auth
        const {id} = this.state.user
        const formData = new FormData()
        formData.append('picture', this.state.picture)
        
        this.props.uploadavatar(token, id, formData)
        .then(response => {
            Swal.fire({
              title: 'Done !',
              text: 'Upload success !',
              icon: 'success',
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Done !',
              text: 'Upload Failed',
              icon: 'danger',
              timer: 2000
            })
          });
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
                Upload Photo Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                 <Form.Group controlId="formBasicEmail">
                    <Form.Control required name="picture" onChange={(e) => this.setState({picture: e.target.files[0]})} type="file" />
                    <Form.Text className="text-muted">
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users
})
  const mapDispatchToProps = {
    uploadavatar,
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar)