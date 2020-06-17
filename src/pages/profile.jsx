import React, {Component} from 'react';
import {Container, 
        Row,
        Form, 
        Card, 
        Button} from 'react-bootstrap';
        import axios from 'axios'
import authHeader from '../services/authHeader'
import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'
import qs from 'querystring'
import Swal from 'sweetalert2'
import moment from 'moment'
const {REACT_APP_URL} = process.env

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '' ,
            birthdate: '' ,
            picture: '' ,
            gender: '' ,
            data: [],
            dataGenre: [],
            pageInfo: [],
            isLoading: false,
            addModalShow : false
        }
        // check auth flow
        const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
            this.setState({isid: user.userData.id})
            
          }else{
            props.history.push('/login')
            this.setState({isLogin: false})
          }
        }
        this.handlePost = this.handlePost.bind(this)
    }

    handleChange = event => {
        this.setState({[ event.target.name]: event.target.value})
    }

    handlePost = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('picture', this.state.picture)
        formData.set('name', this.state.name)
        formData.set('birthdate', this.state.birthdate)
        formData.set('gender', this.state.gender)
        
        const url = `${REACT_APP_URL}users/biodata`
        await axios.patch(url, formData, {headers: authHeader()}).then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                this.props.history.push('/dashboard')
              }
            Swal.fire({
                title: 'Done !',
                text: response.data.message,
                icon: 'success',
                timer: 2000
              })
        }).catch(function (error) {
            Swal.fire({
                title: 'Done !',
                text: error,
                icon: 'warning',
                timer: 2000
              })
        })
    }

    fetchData = async () => {
    this.setState({isLoading: true})
    /* const param = `${qs.stringify(id)}` */
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const url = `${REACT_APP_URL}users/${user.userData.id}`  
            const response = await axios.get(url, {headers: authHeader()})
            const {data} = response.data
            const pageInfo = response.data.pageInfo
            this.setState({data, pageInfo, isLoading: false})   
           
        } catch (error) {
            if (error.response === undefined) {
                return false
            } else {
                Swal.fire({
                    title: 'Done !',
                    text: error.response.data.message,
                    icon: 'warning',
                })
            }
        }
    }

     componentDidMount(){
        this.checkLogin()
        this.fetchData()
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
                    {!this.state.isLoading &&(         
                        <div className="d-flex flex-row w-100">
                            <Sidebar {...this.props}/>           
                                <div className="w-100 d-flex flex-column">
                                    <div className="top-navbar sticky-top">
                                        <TopNavbar search={(query) => this.fetchData(query)}/>
                                    </div>
                                <Container fluid className="mt-4">
                                <Card className="md-4">
                                    <Card.Header>Profile</Card.Header>
                                        <Card.Body>
                                        <Form onSubmit={ this.handlePost}>
                                        {this.state.data.map((user, index) => ( <>
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
                                                <Form.Control as="select" name="gender" defaultValue={user.gender} onChange={(e) => this.handleChange(e)} onChange={(e) => this.handleChange(e)}>
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
                    )}       
                </Row>
            </>
        )
    };
}

export default Profile