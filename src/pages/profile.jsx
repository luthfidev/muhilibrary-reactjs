import React, {Component} from 'react';
import {Container, 
        Row,
        Form, 
        Card, 
        Button} from 'react-bootstrap';
import jwt from 'jsonwebtoken'
import Swal from 'sweetalert2'
import moment from 'moment'
import { connect } from 'react-redux'

import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'

import { getusersid, updateusersprofile } from '../redux/actions/user'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: jwt.decode(this.props.auth.token) || {
                email: '',
                role: '',
              },
            name: '' ,
            birthdate: '' ,
            picture: '' ,
            gender: '' ,
            dataUsers: [],
            isLoading: true,
            addModalShow : false
        }
    }
    componentWillMount() {
        if (!this.props.auth.token) {
            this.props.history.push('/')       
        } else {
            this.fetchData()
        }  
    }  

    handleChange = event => {
        this.setState({[ event.target.name]: event.target.value})
    }

    handlePost = async (event) => {
        event.preventDefault()
        const { token } = this.props.auth
        const formData = new FormData()
        formData.append('picture', this.state.picture)
        formData.set('name', this.state.name)
        formData.set('birthdate', this.state.birthdate)
        formData.set('gender', this.state.gender)
        
        this.props.updateusersprofile(token, formData)
        .then(response => {
            Swal.fire({
              title: 'Done !',
              text: this.props.users.successMsg,
              icon: 'success',
              timer: 2000
            })
          })
          .catch(err => {
            Swal.fire({
              title: 'Done !',
              text: this.props.users.errorMsg,
              icon: 'danger',
              timer: 2000
            })
          });
          this.props.history.push('/dashboard')
    } 
             
    fetchData = async () => {
        const { token } = this.props.auth
        const id = this.state.user.id
        await this.props.getusersid(token, id)
        const { dataUsers, isLoading } = this.props.users
        this.setState({dataUsers, isLoading})           
      }

    render(){
        return(
            <>
             {console.log()}
           
                <Row className="no-gutters w-100 h-100">
                    {this.state.isLoading &&
                        <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                        <Spiner/>
                        </div>
                    }     
                        <div className="d-flex flex-row w-100">
                            <Sidebar {...this.props}/>           
                                <div className="w-100 d-flex flex-column">
                                    <div className="top-navbar sticky-top">
                                        <TopNavbar/>
                                    </div>
                                <Container fluid className="mt-4">
                                <Card className="md-4">
                                    <Card.Header>Profile</Card.Header>
                                        <Card.Body>
                                        <Form onSubmit={ this.handlePost}>
                                        {this.state.dataUsers.map((user, index) => ( <>
                                     {/*    {this.setState({
                                                        name: user.name, 
                                                        picture: user.picture, 
                                                        gender: user.gender,
                                                        birthdate: user.birthdate})} */}
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control required name="name" onChange={(e) => this.handleChange(e)} defaultValue={user.name} type="text" placeholder="Name" />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Picture</Form.Label>
                                                <Form.Control required name="picture" onChange={(e) => this.setState({picture: e.target.files[0]})} type="file" />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group>
                                            <Form.Label>Status</Form.Label>
                                                <Form.Control as="select" name="gender" defaultValue={user.gender}  onChange={(e) => this.handleChange(e)}>
                                                    <option >Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Birthdate</Form.Label>
                                                <Form.Control required name="birthdate" onChange={(e) => this.handleChange(e)} defaultValue={moment(user.birthdate).format('yyyy-MM-DD') }  type="date"  />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            </>))}   
                                            <Button variant="primary" type="submit">
                                                Update
                                            </Button>
                                            </Form>
                                        </Card.Body>
                                </Card>
                                </Container>
                                </div>
                        </div>      
                </Row>
            </>
        )
    };
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users
  })
  
  const mapDispatchToProps = {
    getusersid,
    updateusersprofile,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)