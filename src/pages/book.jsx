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
import qs from 'querystring'
import { connect } from 'react-redux'

import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'
import AddBook from '../components/book/AddBook'

import { getbooks } from '../redux/actions/book'
import { getgenres } from '../redux/actions/genre'

class Book extends Component {
    constructor(props){
        super(props)
        this.state = {
          dataBooks:[],
          dataGenres: [],
          pageInfo: [],
          addModalShow : false,
          isLoading: true,
        }
    }
    
   componentWillMount() {
        if (!this.props.auth.token) {
            this.props.history.push('/')       
        } else {
            this.fetchData()
            this.fetchDataGenres()
        }  
    }  

     fetchData = async (params) => {
        const param = `${qs.stringify(params)}`
        await this.props.getbooks(param)
        const { dataBooks, isLoading } = this.props.books
        this.setState({dataBooks, isLoading})
        if (params) {
            this.props.history.push(`?${param}`)
        }
    } 

     fetchDataGenres = async (params) => {
        await this.props.getgenres()
        const { dataGenres } = this.props.genres
        this.setState({dataGenres})
    } 

    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        let addModalClose = () => this.setState({addModalShow:false})
        
        return(
            <>
             {this.state.isLoading &&
                  <Spiner/>
             }
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
                                                 <img style={{ width: 250, height: 200}} src={book.image} alt="card-book"/>
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
    genres: state.genres,
    auth: state.auth,
})

const mapDispatchToProps = {
    getbooks,
    getgenres
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
