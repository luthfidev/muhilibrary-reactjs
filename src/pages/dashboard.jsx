import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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
                            <Row className="m-2">
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="m-2 mt-3">
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="shadow"> 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Link to="/detail" className="btn btn-primary"> Detail</Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    </Row>
                </>
        )
    };
}

export default Dashboard