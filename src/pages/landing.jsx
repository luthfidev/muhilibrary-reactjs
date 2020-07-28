import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import { 
    Row,
    Navbar, 
    Nav, 
    Form, 
    FormControl, 
    Button, 
    Carousel,
    Badge, 
} from 'react-bootstrap'
import qs from 'querystring'
import jwt from 'jsonwebtoken'

import { connect } from 'react-redux'
import { getbooks, getbookslimit } from '../redux/actions/book'

import slide1 from '../assets/img/landing/1.jpg'
import slide2 from '../assets/img/landing/2.jpg'
import slide3 from '../assets/img/landing/3.jpg'
import Spiner from '../components/Loader'

class Landing extends Component {
    constructor(props){
        super(props)
        this.state = {
        user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
            },
          dataBooks: [],
          dataBookLimit: [],
          dataGenre: [],
          pageInfo: [],
          isLoading: true,
          addModalShow : false,
          query: ''
        }
        
    }

      componentDidMount(){
        this.fethData()
        this.fethDataLimit()
      }

      fethData = async () => {
        await this.props.getbooks()
        const { dataBooks, isLoading } = this.props.books
        this.setState({ dataBooks, isLoading })
      }

      fethDataLimit = async () => {
        await this.props.getbookslimit()
        const { dataBookLimit, isLoading } = this.props.books
        this.setState({ dataBookLimit, isLoading })
      }

      
    search = (e) => {
        if(e.keyCode === 13) {
            this.props.search(
                { search: this.state.query } 
            )
        }
    }

    render() {
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1

        return (
            <>
                    <Navbar bg="light" expand="md" className="shadow rounded">
                        <Navbar.Brand href="#home">Library App</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">E-books</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            {this.props.auth.token &&
                            <Link className="btn btn-info mr-2 shadow" to="/dashboard">Dashboard</Link>
                            }
                            {!this.props.auth.token && (<>
                            <Link className="btn btn-info mr-2 shadow" to="/login">Login</Link>
                            <Link className="btn btn-info mr-2 shadow" to="/Register">Register</Link>
                            </>)}
                        </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.state.isLoading &&
                       <div className='d-flex w-100 h-100 justify-content-center align-content-center align-items-center'>
                       <Spiner/>
                       </div>
                        }
                        {!this.state.isLoading && (<>
                        <Row className="body-bg no-gutters w-100">
                                <div className="d-flex justify-content-center mt-3 col-md-6 col-sm-12">
                                <Carousel className="caraousel-landing shadow ml-4">
                                    <Carousel.Item>
                                    <img
                                        className="caraousel-landing d-block "
                                        src={slide1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                    <img
                                        className="caraousel-landing d-block"
                                        src={slide2}
                                        alt="Third slide"
                                    />
                                
                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                    <img
                                        className="caraousel-landing d-block"
                                        src={slide3}
                                        alt="Third slide"
                                    />
                                
                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            <div className="mt-3 col-md-6 col-sm-12">
                                <div className="d-flex flex-column ml-4 mr-4">
                                    <div className="landing-title-author mb-2">Top 3 Recomended Books</div>
                                    <Row>
                                    {this.state.dataBookLimit.map((book, index) => ( 
                                    <div className="card-book-top">
                                        <img style={{ width: 150, height: 200}} src={book.image} alt="card-book"/>
                                    </div>
                                     ))} 
                                    </Row>
                                </div>
                            </div>
                            <div className="landing-card-title col-md-12 mt-5 d-flex justify-content-center">
                                <h2>BROWSE YOUR BOOKS</h2>
                            </div>
                            <div className="landing-card d-flex col-md-12 col-sm-12">
                                <Row className="w-100 d-flex justify-content-center">
                                {this.state.dataBooks.map((book, index) => (    
                                    <div className="card-book">
                                        <img style={{ width: 250, height: 200}} src={book.image} alt="card-book"/>
                                        <div className="card-book-text">
                                            <div className="d-flex justify-content-center mt-4">
                                            <Badge pill variant="warning">{book.nameStatus}</Badge>
                                            </div>
                                            <div className="p-2 card-description">
                                                <p>{book.description}</p>
                                            </div>
                                        </div>
                                        <div className="card-book-btn d-flex justify-content-center">
                                        {book.nameStatus === "Available" && 
                                        <Link className="btn-borrow" 
                                        to={{
                                            pathname: `/detail/${book.id}`,
                                            state: {
                                            bookid: `${book.id}`
                                            }
                                         }}>Borrow</Link>
                                        }
                                        </div>
                                    </div>
                                ))}   
                                </Row>
                            </div>
                        </Row>
                        </>)}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    books: state.books
})
const mapDispatchToProps = {
    getbooks,
    getbookslimit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
