import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Spiner from '../components/Loader'
import SpinerContent from '../components/LoaderContent'
import {Row, 
        Navbar, 
        Card, 
        Col, 
        Form, 
        FormControl, 
        Button, 
        Carousel, 
        Container, 
        Dropdown} from 'react-bootstrap';
import qs from 'querystring'
import slide1 from '../assets/img/landing/1.jpg'
import slide2 from '../assets/img/landing/2.jpg'
import slide3 from '../assets/img/landing/3.jpg'

// file form modal Add
import {Register} from '../components/Register' 
const {REACT_APP_URL} = process.env

class Landing extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          dataGenre: [],
          pageInfo: [],
          isLoading: false,
          addModalShow : false,
          query: ''
        }
        
        const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
          }else{
            this.setState({isLogin: false})
          }
        }

    }

      fetchData = async (params) => {
            this.setState({isLoading: true})
            const param = `${qs.stringify(params)}`
            const url = `${REACT_APP_URL}books?limit=20?${param}`
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
          const param = qs.parse(this.props.location.search.slice(1))
          this.checkLogin()
          await this.fetchData(param)
          await this.fetchDataGenre()
      }

      
    search = (e) => {
        if(e.keyCode === 13) {
            this.props.search(
                { search: this.state.query } 
            )
        }
    }

    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
         // set state addModal
         let addModalClose = () => this.setState({addModalShow:false})
    
        return(
            <>
               {this.state.isLoading &&
                <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                <Spiner/>
                
                </div>
                } 
                {!this.state.isLoading &&(
                <Row className="no-gutters w-100 h-100">
                    {/* component modal add */}
                    <Register
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                <Navbar className="w-100" bg="light" expand="lg">
                <Navbar.Brand href="#home">Muhilibrary</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
               
                <div className="action-landing w-100 d-flex justify-content-end">
                {!this.state.isLogin && (<>
                    <Link to="/login" className="ml-2 mr-2 btn btn-outline-primary"> Login</Link>
                    <button onClick={()=> this.setState({addModalShow: true})} className="btn btn-outline-info">Register</button>
                </>)}
                {this.state.isLogin && (
                <Link to="/dashboard" className="ml-2 mr-2 btn btn-outline-info"> Dashboard</Link>
                )}
                </div>
                </Navbar.Collapse>
                </Navbar>
                    <div className="landing-header">
                   <Carousel >
                    <Carousel.Item>
                        <img style={{ height: '500px' }}
                        className="d-block w-100"
                        src={slide1}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{ height: '500px' }}
                        className="d-block w-100"
                        src={slide2}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{ height: '500px' }}
                        className="d-block w-100"
                        src={slide3}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    </Carousel>
                    </div>
                   {/*  <Form inline onSubmit={(e) => e.preventDefault()} className="landing-search-book d-flex w-100 justify-content-center align-content-center">
                    <FormControl style={{width: 400, height: 50}} onKeyDown={(e) => this.search(e)} onChange={(e) => this.setState({ query: e.target.value })} search={(query) => this.fetchData(query)} type="text" placeholder="Search book title"  className="input-search shadow mr-sm-2 " />
                    </Form> */}
                    <div className="w-100 d-flex justify-content-center mt-2">    
                        <div className="d-flex flex-row mr-5">
                                            
                        </div>
                        <Row className="md-4">
                            <div className="btn-action d-flex flex-row ">
                                    <Dropdown className="mb-4">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Genre
                                    </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: '' })}>All</Dropdown.Item>
                                        {this.state.dataGenre.map(genre => 
                                            <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: genre.name })}>{genre.name}</Dropdown.Item>
                                        )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                        <Dropdown className="mb-4 ml-2">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Sort
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 0 })}>A-z</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 1 })}>Z-a</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>    
                            </div>
                            
                        </Row> 
                        <Col md="6" lg="6">
                        <Row className="md-6 ml-5 ">
                                {this.state.data.map((book, index) => (  
                                    <Link key={book.id.toString()} to={{
                                                                        pathname: `/detail/${book.id}`,
                                                                        state: {
                                                                        bookid: `${book.id}`,
                                                                        booktitle: `${book.title}`,
                                                                        bookimage: `${book.image}`,
                                                                        bookgenre: `${book.genreName}`,
                                                                        bookauthor: `${book.authorName}`,
                                                                        bookstatus: `${book.nameStatus}`,
                                                                        }
                                                                    }}  className="text-dark text-decoration-none"> 
                                        <Card className="shadow m-2" style={{ width: '10rem' }}>
                                            <Card.Img variant="top" style={{ height: '200px' }} src={book.image} />
                                            {/* <Card.Body>
                                                <Card.Subtitle className="ml-2 badge badge-success text-white">{book.nameStatus}</Card.Subtitle>
                                            </Card.Body> */}
                                            </Card>
                                    </Link>
                                ))}
                           
                        </Row>
                        </Col>
                       
                    </div> 
                    
                    <div className="">

                    </div>
                    <div className="landing-footer bg-light no-gutters">
                        <Row className="no-gutters text-muted d-flex flex-row justify-content-center">
                                <div>By signing up, you agree to Book’s</div>
                        </Row>
                    </div>
                </Row>
                )}    
            </> 
        )
    };
}

export default Landing