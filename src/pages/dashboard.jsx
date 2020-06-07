import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'
import { Container, Row, Col, Jumbotron, Card, Carousel } from 'react-bootstrap';

class Dashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: []
        }
      }


      async componentDidMount(){
          const results = await axios.get('https://api-muhilibrary.herokuapp.com/books?limit=10')
          const {data} = results
          this.setState(data) 
      }
    
    render(){
      
        return(
            <>
                <Row className="no-gutters w-100 h-100">
                    <div className="d-flex flex-row w-100">
                        <Sidebar/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar/>
                                </div>
                               <Container fluid className="mt-4">
                                    <Jumbotron>
                                    <Carousel>
                                    {this.state.data.map((book, index) => (  
                                        <Carousel.Item>
                                            <img style={{ height: '200px' }}
                                            className="d-block"
                                            src={book.image}
                                            alt="First slide"
                                            />
                                            <Carousel.Caption>
                                            <h3>{book.title}</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        ))}
                                        </Carousel>
                                    </Jumbotron>
                                    <Col>
                                    
                                    {this.state.data.length !== 0 &&(
                                        
                                    <Row>
                        
                                        {this.state.data.map((book, index) => (  
                                        <Link to="/detail" className="text-dark text-decoration-none"> 
                                            <Card className="shadow m-2" style={{ width: '18rem' }}>
                                                <Card.Img variant="top" style={{ height: '200px' }} src={book.image} />
                                                <Card.Body>
                                                    <Card.Title>{book.title}</Card.Title>
                                                    <Card.Subtitle className="badge badge-primary">{book.genreName}</Card.Subtitle>
                                                    <Card.Subtitle className="ml-2 badge badge-success text-white">{book.nameStatus}</Card.Subtitle>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.             
                                                    </Card.Text>
                                                </Card.Body>
                                                </Card>
                                        </Link>
                                        ))}
                                          
                                    </Row>
                                         )}
                                         {this.state.data.length===0 &&(
                                             <Spiner/>
                                         )}
                                         
                                    </Col>
                               </Container>
                            </div>
                    </div>        
                </Row>
            </>
        )
    };
}

export default Dashboard