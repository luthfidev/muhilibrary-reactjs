import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, 
        Row, 
        Col, 
        Jumbotron, 
        Carousel, 
        Pagination, 
        Dropdown,
        Badge,
     } from 'react-bootstrap';
import axios from 'axios'
import authHeader from '../services/authHeader'
import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'
import AddBook from '../components/book/AddBook'
import qs from 'querystring'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { getbooks } from '../redux/actions/book'
import { getgenres } from '../redux/actions/genre'

const { REACT_APP_URL } = process.env

class Book extends Component {
    constructor(props){
        super(props)
        this.state = {
          dataBooks:[],
          dataGenres: [],
          pageInfo: [],
          addModalShow : false
        }
        // check auth flow
       /*  const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
            this.setState({isAdmin: user.userData.role})
          }else{
              props.history.push('/login')
            this.setState({isLogin: false})
          }
        } */
      }


   componentDidMount(){
       /*  this.checkLogin() */
      const param = qs.parse(this.props.location.search.slice(1))
     /*  await this.props.getbooks()
      const { dataBooks } = this.props.books
      this.setState({dataBooks}) */
        // this.fetchDataGenre()
    this.fetchData()
    this.fetchDataGenres()
    }

     fetchData = async (params) => {
        const param = `${qs.stringify(params)}`
        await this.props.getbooks(param)
        const { dataBooks } = this.props.books
        this.setState({dataBooks})
        if (params) {
            this.props.history.push(`?${param}`)
        }
    } 

     fetchDataGenres = async (params) => {
        await this.props.getgenres()
        const { dataGenres } = this.props.genres
        this.setState({dataGenres})
    } 


    /* fetchData = async (params) => {
    const param = `${qs.stringify(params)}`
        try {
            const url = `${REACT_APP_URL}books?${param}`
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
        if (params) {
            this.props.history.push(`?${param}`)
        }
    } */

    fetchDataGenre = async () => {
    this.setState({isLoading: true})
    const url = `${REACT_APP_URL}genres`
    const results = await axios.get(url, {headers: authHeader()})
    const {data} = results.data
    this.setState({dataGenre: data, isLoading: false})
    }
  
    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        let addModalClose = () => this.setState({addModalShow:false})

        
        return(
            <>
                <Row className="no-gutters w-100 h-100">        
                    <div className="d-flex flex-row w-100">
                        <Sidebar {...this.props}/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar search={(query) => this.fetchData(query)}/>
                                </div>
                               <Container fluid className="mt-4">
                                    <Jumbotron className="jumbotron-dashboard shadow">
                                    <Carousel>
                                    {this.state.dataBooks.map((book, index) => (  
                                        <Carousel.Item key={book.id.toString()}>
                                            <img  style={{ height: '200px' }}
                                            className="d-block"
                                            src={book.image}
                                            alt="Slider"
                                            />
                                            <Carousel.Caption>
                                            <h3 className="text-dark">{book.title}</h3>
                                            <p className="text-dark">{book.description}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        ))}
                                        </Carousel>
                                    </Jumbotron>
                                    <Col>
                                        <div className="d-flex flex-row ">
                                        <Dropdown className="mb-4">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Genre
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: '' })}>All</Dropdown.Item>
                                            {this.state.dataGenres.map(genre => 
                                                <Dropdown.Item key={genre.id.toString()} onClick={() => this.fetchData({ ...params, search: genre.name })}>{genre.name}</Dropdown.Item>
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
                                           {/*  {this.state.isAdmin === 'admin' &&  */}
                                            <div className="ml-2">
                                                <button onClick={()=> this.setState({addModalShow: true})} className="btn btn-primary mb-2">Add Book</button>
                                            </div>
                                           {/*  } */}
                                        </div>
                                    
                                    <AddBook
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        refreshdata={() => this.fetchData()}
                                    />
                                    {this.state.dataBooks.length !== 0 &&(
                                    <Row>
                                        {this.state.dataBooks.map((book, index) => (  
                                            <div className="card-book">
                                                 <img style={{ width: 250, height: 200}} src={book.image}/>
                                                 <div className="card-book-text">
                                                      <Badge pill variant="warning">{book.nameStatus}</Badge>
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
                                       /*  <Link key={book.id.toString()} to={{
                                                                            pathname: `/detail/${book.id}`,
                                                                            state: {
                                                                            bookid: `${book.id}`,
                                                                            booktitle: `${book.title}`,
                                                                            bookrelease: `${book.releaseDate}`,
                                                                            bookimage: `${book.image}`,
                                                                            bookdesc: `${book.description}`,
                                                                            bookgenreid: `${book.genreId}`,
                                                                            bookgenre: `${book.genreName}`,
                                                                            bookauthorid: `${book.authorId}`,
                                                                            bookauthor: `${book.authorName}`,
                                                                            bookstatusid: `${book.nameStatusId}`,
                                                                            bookstatus: `${book.nameStatus}`,
                                                                            }
                                                                        }}  className="text-dark text-decoration-none"> 
                                            <Card className="shadow m-2" style={{ width: '18rem' }}>
                                                <Card.Img variant="top" style={{ height: '200px' }} src={book.image} />
                                                <Card.Body>
                                                    <Card.Title>{book.title}</Card.Title>
                                                    <Card.Subtitle className="badge badge-primary">{book.genreName}</Card.Subtitle>
                                                    <Card.Subtitle className="ml-2 badge badge-success text-white">{book.nameStatus}</Card.Subtitle>
                                                    <Card.Text>
                                                    {book.description}
                                                    </Card.Text>
                                                </Card.Body>
                                                </Card>
                                        </Link> */
                                        ))}           
                                    </Row>
                                    )}
                                    {this.state.dataBooks.length === 0 &&(
                                        <h1>Data Not Available</h1>
                                    )}
                                         
                                    </Col>
                                    <div className="d-flex justify-content-center">
                                    <Pagination>
                                            <Pagination.First onClick={()=>this.fetchData({...params, page: parseInt(params.page)-1})}/>
                                            <Pagination.Prev />
                                            <Pagination.Ellipsis />
                                            {[...Array(this.state.pageInfo.totalPage)].map((o, i)=>{
                                             return (
                                            <Pagination.Item onClick={()=>this.fetchData({...params, page: params.page? i+1 : i+1})} className='mr-1 ml-1' key={i.toString()}>{i+1}</Pagination.Item>
                                             )
                                            })}
                                            <Pagination.Next onClick={()=>this.fetchData({...params, page: parseInt(params.page)+1})}/>
                                            <Pagination.Ellipsis />
                                            <Pagination.Last />
                                    </Pagination>
                                    </div>
                               </Container>
                            </div>
                    </div>     
                </Row>
            </>
        )
    };
}

const mapStateToProps = (state) => ({
    books: state.books,
    genres: state.genres
})

const mapDispatchToProps = {
    getbooks,
    getgenres
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)

// export default Book