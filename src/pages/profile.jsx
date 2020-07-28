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

    handlePost = (event) => {
        event.preventDefault()
        const profileData = {
          name: this.state.name,
          gender: this.state.gender,
          birthdate: moment(this.state.birthdate).format('yyyy-MM-DD')
        }
      const { token } = this.props.auth
      this.props.updateusersprofile(token, profileData)
       .then(response => {
        Swal.fire({
          title: 'Done !',
          text: 'Update Success !',
          icon: 'success',
          timer: 2000
        })
      })
      .catch(err => {
        Swal.fire({
          title: 'Error !',
          text: 'Update Failed !',
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
        this.state.dataUsers.map((data, index) => {
            this.setState({
               name: data.name,
               birthdate: data.birthdate,
               gender: data.gender
            })
        })      
      }

    render(){
        const {name, gender} = this.state;
        const convertDate = moment(this.state.birthdate).format('yyyy-MM-DD')
        return(
            <>           
                <Row className="no-gutters w-100 h-100">
                    {this.state.isLoading &&
                        <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                        <Spiner/>
                        </div>
                    }     
                    {!this.state.isLoading &&(   
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
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control required name="name" onChange={(e) => this.handleChange(e)} defaultValue={name} value={name} type="text" placeholder="Name" />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group>
                                            <Form.Label>Status</Form.Label>
                                                <Form.Control as="select" name="gender"  onChange={(e) => this.handleChange(e)} defaultValue={gender} value={gender}>
                                                    <option>{gender}</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Birthdate</Form.Label>
                                                <Form.Control required name="birthdate" onChange={(e) => this.handleChange(e)} defaultValue={convertDate} value={convertDate} type="date" />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Update
                                            </Button>
                                            </Form>
                                        </Card.Body>
                                </Card>
                                </Container>
                                </div>
                        </div>    
                         )}     
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