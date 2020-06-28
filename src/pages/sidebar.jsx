import React, {Component} from 'react'
import {Nav, Button, Spinner} from 'react-bootstrap'
import {BsBook, 
        BsBrush, 
        BsCardList, 
        BsFileText, 
        BsPersonFill,
        BsCheckCircle } from 'react-icons/bs'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import jwt from 'jsonwebtoken'

import { getusersid } from '../redux/actions/user'
import { logout } from '../redux/actions/auth'
import imgError from '../assets/img/jono.png'
const {REACT_APP_URL} = process.env

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
          },
          dataUsers: [],
          isLoading: true,
        }
    }

    componentDidMount(){
      this.fetchData()
    }

    onLogout = async () => {
      const { token } = this.props.auth
      await this.props.logout(token)
      this.props.history.push('/login')
    }
    
    fetchData = async () => {
      /* const param = `${qs.stringify(id)}` */
      const { token } = this.props.auth
      const id = this.state.user.id
      await this.props.getusersid(token, id)
      const { dataUsers, isLoading } = this.props.users
      this.setState({dataUsers, isLoading})           
    }
   
    render(){
        return(
            <>
            
            <Nav className="d-none d-md-block sidebar bg-light shadow">
            {this.state.dataUsers.map((user, index) => (
                <div className="avatar-img">
                    <img onError={imgError} key={user.id} src={`${REACT_APP_URL}`+user.picture} alt="avatar"/>
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
               { this.state.user.role === 'admin' && (<> 
                <Nav.Item>
                  <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/author"><BsBrush/> Author</Link>
                </Nav.Item>
                <Nav.Item>
                 <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/genre"><BsCardList/> Genre</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/transaction"><BsFileText/> Transaction</Link>
                </Nav.Item>
               </>)}
                { this.state.user.role  === 'user' && (<> 
                <Nav.Item>
                <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/userhistory"><BsCheckCircle/>History</Link>
                </Nav.Item>
               </>)} 
                <Nav.Item>
               {/*  <Link className="nav-link text-decoration-none text-dark font-weight-bold" onClick={this.onLogout}> Logout</Link> */}
               <Button onClick={this.onLogout} className="ml-2 mt-2" variant="info" >
               {this.props.auth.isLoading &&(
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

// export default Sidebar

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

const mapDispatchToProps = {
  getusersid,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)