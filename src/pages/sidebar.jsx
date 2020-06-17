import React, {Component} from 'react'
import {Nav, Button, Spinner} from 'react-bootstrap'
import {BsBook, 
        BsBrush, 
        BsCardList, 
        BsFileText, 
        BsPersonFill,
        BsPeopleFill, 
        BsCheckCircle } from 'react-icons/bs'
import Spiner from '../components/Loader'
import { Link } from 'react-router-dom';
import axios from 'axios'
import avatar from '../assets/img/jono.png'
import authHeader from '../services/authHeader'
import Swal from 'sweetalert2'
const {REACT_APP_URL} = process.env

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isLogin: false,
          isLoading: false,
          data: []
        }

        const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
            this.setState({isid: user.userData.id})
            this.setState({isAdmin: user.userData.role})
          }else{
            this.setState({isLogin: false})
          }
        }

        this.onLogout = () => {
            this.setState({isLoading: true},()=>{
              setTimeout(()=>{
                const url = `${REACT_APP_URL}auth/logout`
                axios.delete(url,{headers: authHeader()}).then((response) => {
                })
                .catch(function (error) {
                 }) 
                this.setState({isLoading: false}, ()=>{
                  localStorage.removeItem('user')
                  this.props.history.push('/login')
                })
              },5000)
            })
          }
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
      this.fetchData()
      this.checkLogin()
    }

    render(){
      const {isLoading} = this.state
        return(
            <>
            
            <Nav className="d-none d-md-block sidebar bg-light shadow">
            {this.state.data.map((user, index) => (
                <div className="avatar-img">
                    <img src={`${REACT_APP_URL}`+user.picture} alt="avatar"/>
                    <h1>{user.name}</h1>
                </div>
                ))}   
                <Nav.Item className="mt-4">
                <Link Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/dashboard"><BsBook/> Dashboard</Link>
                </Nav.Item>
                <Nav.Item>
                <Link Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/book"><BsBook/> Book</Link>
                </Nav.Item>
                <Nav.Item>
                <Link Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/profile"><BsPersonFill/> Profile</Link>
                </Nav.Item>
                { this.state.isAdmin === 'admin' && (<>
                <Nav.Item>
                  <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/author"><BsBrush/> Author</Link>
                </Nav.Item>
                <Nav.Item>
                 <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/genre"><BsCardList/> Genre</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/transaction"><BsFileText/> Transaction</Link>
                </Nav.Item>
           {/*      <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/user"><BsPeopleFill/> User</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/status"><BsCheckCircle/> Status</Link>
                </Nav.Item> */}
               </>)}
                { this.state.isAdmin === 'user' && (<>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/userhistory"><BsCheckCircle/>History</Link>
                </Nav.Item>
                </>)}
                <Nav.Item>
               {/*  <Link className="nav-link text-decoration-none text-dark font-weight-bold" onClick={this.onLogout}> Logout</Link> */}
               <Button onClick={this.onLogout} className="ml-2 mt-2" variant="info" disabled={isLoading}>
               {isLoading &&(
                <Spinner 
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />)} Logout</Button>
                </Nav.Item>
            </Nav>
            </>
        )
    }
}

export default Sidebar