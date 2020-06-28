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
} from 'react-bootstrap'
import qs from 'querystring'
import jwt from 'jsonwebtoken'

import { connect } from 'react-redux'
import { getbooks } from '../redux/actions/book'

import slide1 from '../assets/img/landing/1.jpg'
import slide2 from '../assets/img/landing/2.jpg'
import slide3 from '../assets/img/landing/3.jpg'
import Spiner from '../components/Loader'

import {Register} from '../components/Register' 
const {REACT_APP_URL} = process.env


class Landing extends Component {
    constructor(props){
        super(props)
        this.state = {
        user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
            },
          dataBooks: [],
          data: [],
          dataGenre: [],
          pageInfo: [],
          isLoading: true,
          addModalShow : false,
          query: ''
        }
        
    }

      fetchData = async (params) => {
            this.setState({isLoading: true})
            const param = `${qs.stringify(params)}`
            const url = `${REACT_APP_URL}books?limit=10?${param}`
            const results = await axios.get(url)
            const {data} = results.data
            const pageInfo = results.data.pageInfo
            this.setState({data, pageInfo, isLoading: false})
            if (params) {
                this.props.history.push(`?${param}`)
            }
      }

      fetchDataGenre = async (params) => {
        this.setState({isLoading: true})
        const url = `${REACT_APP_URL}genres`
        const results = await axios.get(url)
        const {data} = results.data
    
        this.setState({dataGenre: data, isLoading: false})
  }

      async componentDidMount(){
        //   const param = qs.parse(this.props.location.search.slice(1))
        //   this.checkLogin()
        //   await this.fetchData(param)
        //   await this.fetchDataGenre()
        await this.props.getbooks()
        const { dataBooks, isLoading } = this.props.books
        this.setState({ dataBooks, isLoading })
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
         // set state addModal
         let addModalClose = () => this.setState({addModalShow:false})
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
                        <Spiner/>
                    }
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
                                    <div className="landing-title-author">LIST AUTHOR</div>
                                        <li className="landing-list-author"></li>
                                        <li className="landing-list-author"></li>
                                        <li className="landing-list-author"></li>
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
                                            <p className="m-2">
                                                
                                            </p>
                                        </div>
                                        <div className="card-book-btn d-flex justify-content-center mt-2">
                                        <Link className="btn-borrow" to={{
                                                                            pathname: `/detail/${book.id}`,
                                                                            state: {
                                                                            bookid: `${book.id}`
                                                                            }
                                                                        }}>Borrow</Link>
                                        </div>
                                    </div>
                                ))} 
                                </Row>
                            </div>
                        </Row>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    books: state.books
})
const mapDispatchToProps = {
    getbooks
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
