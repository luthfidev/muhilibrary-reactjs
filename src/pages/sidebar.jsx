import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

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
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link><Link className="text-decoration-none " to="/author"> Author</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </>
        )
    }
}

export default Sidebar