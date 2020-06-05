import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {Row, 
        Form, 
        FormGroup, 
        Label, 
        Input, 
        Col, 
        Nav, Button, Container, Card, CardImg, CardText, CardBody,
        CardTitle, CardSubtitle, NavItem, NavLink} from 'reactstrap'
import avatar from '../assets/img/jono.png'

class Dashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: []
        }
      }

      async componentDidMount(){
        const results = await axios.get('https://api-muhilibrary.herokuapp.com/books')
        const {data} = results
        this.setState(data)
      }


    render(){
        return(
                <>          
                        <Row className="navbar-dashboard no-gutters">
                            <Col className="no-gutters">
                                <Nav className="navbar-light bg-dark">
                                <NavItem>
                                <NavLink href="#">All Category</NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink href="#">All Time</NavLink>
                                </NavItem>
                                <NavItem>
                                <FormGroup className="mt-2 ">
                                    <Input className="rounded-pill" type="text" placeholder="Search" />
                                </FormGroup>
                                </NavItem>
                                <NavItem>
                                <NavLink  href="#">Icon</NavLink>
                                </NavItem>
                                </Nav>
                            </Col>
                        </Row>
                    <Row className="">
                    <Col md={2} className="ml-3 mt-2 shadow">
                        <Nav vertical>
                            <Col className="ml-5 mt-3">
                            <NavItem>
                                <img className="avatar shadow" src={avatar} alt="avatar"/>
                            </NavItem>
                            <NavItem>
                            <h1>Jono</h1>
                            </NavItem>
                            </Col>
                            <NavItem>
                            <NavLink href="#">Explore</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="#">History</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink href="#">Add book</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md={9}>
                        <Container className="mt-3">
                        {this.state.data.length !== 0 &&(
                            <Row className="m-2">
                           {this.state.data.map((book, index) => (  
                                <Col>   
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>{book.title}</CardTitle>
                                        <CardSubtitle className="badge badge-primary">{book.genreName}</CardSubtitle>
                                        <CardText>{book.nameStatus}</CardText>
                                        <Link to={`/detail:${book.id}`} className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                   
                                </Col>
                                 ))}
                           
                            </Row>
                            )}
                            {this.state.data.length===0 &&(
                                <h1>Data is not available!</h1>
                            )}
                        </Container>
                    </Col>
                    </Row>
                </>
        )
    };
}

export default Dashboard