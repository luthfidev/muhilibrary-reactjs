import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {
    Form,
    Navbar,
    Nav,
    FormControl
   } from 'react-bootstrap'

import brand from '../assets/img/bookshelf.png'

class TopNavbar extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: ''
        }
    }
    

  /*   onChangeHandler = (e) => {
        this.props.search(
            { search: this.state.query } 
        )
      
      }; */

    search = (e) => {
        if(e.keyCode === 13) {
            this.props.search(
                { search: this.state.query } 
            )
        }
    }

    

    render(){

        return(
            <>
         <Navbar bg="light" expand="sm" className="w-100 h-100 top-navbar">
                <Navbar.Brand href="#home">Welcome</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex w-100 justify-content-center">
                    <Form inline onSubmit={(e) => e.preventDefault()}>
                    <FormControl type="text" placeholder="Search" onKeyDown={(e) => this.search(e)} onChange={(e) => this.setState({ query: e.target.value })} className="input-search mr-sm-2" />
                    </Form>
                    </Nav>
                    <Link to="/" className="text-decoration-none">
                        <div className="navbar-brand d-flex">
                        <img src={brand} alt="brand"/>
                            <h3 className="font-weight-bold align-self-end ml-2" >Library</h3>
                        </div>
                    </Link>
                </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

export default TopNavbar