import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { BsBook, BsBrush, BsCardList, BsFileText, BsPersonFill, BsCheckCircle } from 'react-icons/bs'

import { Link } from 'react-router-dom';
import avatar from '../assets/img/jono.png'

class Sidebar extends Component {
    render(){
        return(
            <>
            <Nav className="d-none d-md-block sidebar bg-light shadow">
                <div className="avatar-img">
                    <img src={avatar} alt="avatar"/>
                    <h1>Jono</h1>
                </div>
                <Nav.Item className="mt-4">
              <Link className="nav-link text-decoration-none text-dark font-weight-bold" to="/dashboard"><BsBook/> Dashboard</Link>
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
                <Link className=" nav-link text-decoration-none text-dark font-weight-bold" to="/logout"> Logout</Link>
                </Nav.Item>
            </Nav>
            </>
        )
    }
}

export default Sidebar