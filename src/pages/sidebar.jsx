import React, { Component } from 'react'
import { Nav, Button, Spinner } from 'react-bootstrap'
import { BsBook, BsBrush, BsCardList, BsFileText, BsPersonFill, BsCheckCircle } from 'react-icons/bs'
import Spiner from '../components/Loader'
import { Link } from 'react-router-dom';
import axios from 'axios'
import avatar from '../assets/img/jono.png'
import authHeader from '../services/authHeader'
const {REACT_APP_URL} = process.env

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isLogin: false,
          isLoading: false
        }

        const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
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
                  console.log(error.response);
                 }) 
                this.setState({isLoading: false}, ()=>{
                  localStorage.removeItem('user')
                  this.props.history.push('/login')
                })
              },5000)
            })
          }
    }
      componentDidMount(){
        this.checkLogin()
      }
    render(){
      const {isLoading} = this.state
        return(
            <>
            <Nav className="d-none d-md-block sidebar bg-light shadow">
                <div className="avatar-img">
                    <img src={avatar} alt="avatar"/>
                    <h1>Jono</h1>
                </div>
                <Nav.Item className="mt-4">
                <Link Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/dashboard"><BsBook/> Dashboard</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/author"><BsBrush/> Author</Link>
                </Nav.Item>
                <Nav.Item>
                 <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/genre"><BsCardList/> Genre</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/transaction"><BsFileText/> Transaction</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/user"><BsPersonFill/> User</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/status"><BsCheckCircle/> Status</Link>
                </Nav.Item>
                <Nav.Item>
               {/*  <Link className="nav-link text-decoration-none text-dark font-weight-bold" onClick={this.onLogout}> Logout</Link> */}
               <Button onClick={this.onLogout} className="ml-2" variant="info" disabled={isLoading}>
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