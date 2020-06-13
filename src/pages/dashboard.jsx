import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'
import { Container, Row, Col, Jumbotron, Card, Carousel, Pagination, Dropdown } from 'react-bootstrap';
import qs from 'querystring'
import AsyncSelect from 'react-select/async'
import authHeader from '../services/authHeader'
import {AddBook} from '../components/book/AddBook'
import Swal from 'sweetalert2'

const {REACT_APP_URL} = process.env

class Dashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          dataGenre: [],
          pageInfo: [],
          isLoading: false,
          addModalShow : false
        }
        // check auth flow
        this.checkToken = () => {
            if(!localStorage.getItem('user')){
                Swal.fire({
                    title: 'Done !',
                    text: 'You must be login !',
                    icon: 'warning',
                  })
                props.history.push('/login')
            } else {
                props.history.push('/dashboard')
            }
        }
      }

      fetchData = async (params) => {
            this.setState({isLoading: true})
            const param = `${qs.stringify(params)}`
           try {
               const url = `${REACT_APP_URL}books?${param}`
               const response = await axios.get(url, {headers: authHeader()})
               const {data} = response.data
               const pageInfo = response.data.pageInfo
               this.setState({data, pageInfo, isLoading: false})       
           } catch (error) {
            if (error.response=== undefined) {
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
      }

      fetchDataGenre = async () => {
        this.setState({isLoading: true})
        const url = `${REACT_APP_URL}genres`
        const results = await axios.get(url, {headers: authHeader()})
        const {data} = results.data
    
        this.setState({dataGenre: data, isLoading: false})
  }


      async componentDidMount(){
          await this.checkToken()
          const param = qs.parse(this.props.location.search.slice(1))
          await this.fetchData(param)
          await this.fetchDataGenre()
      }


    /*  filterColors = (inputValue) => {
        return this.fetchData.genreName.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      };
    */
   
 /*     promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(filterColors(inputValue));
            }, 1000);
        });  */


    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        let addModalClose = () => this.setState({addModalShow:false})
       
      /*  const parse = JSON.parse(localStorage.getItem('user'))
     
        {console.log(parse.userData.role)} */
        return(
            <>
                <Row className="no-gutters w-100 h-100">
            {this.state.isLoading &&
                <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                <Spiner/>
                
                </div>
                }
                 {!this.state.isLoading &&(         
                    <div className="d-flex flex-row w-100">
                        <Sidebar {...this.props}/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar search={(query) => this.fetchData(query)}/>
                                </div>
                               <Container fluid className="mt-4">
                                    <Jumbotron className="jumbotron-dashboard shadow">
                                    <Carousel>
                                    {this.state.data.map((book, index) => (  
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
                                            <div className="ml-2">
                                                <button onClick={()=> this.setState({addModalShow: true})} className="btn btn-primary mb-2">Add Book</button>
                                            </div>
                                        </div>
                                    
                                    <AddBook
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        refreshdata={() => this.fetchData()}
                                    />
                                    {this.state.data.length !== 0 &&(
                                    <Row>

                                        {this.state.data.map((book, index) => (  
                                        <Link key={book.id.toString()} to={{
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
                                        </Link>
                                        ))}           
                                    </Row>
                                    )}
                                    {this.state.data.length===0 &&(
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
                )}       
                </Row>
            </>
        )
    };
}

export default Dashboard