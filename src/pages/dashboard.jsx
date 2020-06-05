import React, {Component} from 'react';
import {Row, 
        Form, 
        FormGroup, 
        Label, 
        Input, 
        Col, 
        Nav, Button, Container, Card, CardImg, CardText, CardBody,
        CardTitle, CardSubtitle, NavItem, NavLink} from 'reactstrap'


class Dashboard extends Component {
    render(){
        return(
                <>          
                        <Row className="navbar-dashboard w-100 no-gutters">
                            <Col className="no-gutters">
                                <Nav className="navbar-light bg-dark">
                                <NavItem>
                                <NavLink href="#">All Category</NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink href="#">All Time</NavLink>
                                </NavItem>
                                <NavItem>
                                <FormGroup className="mt-2">
                                    <Input type="text" placeholder="Search" />
                                </FormGroup>
                                </NavItem>
                                <NavItem>
                                <NavLink href="#">Icon</NavLink>
                                </NavItem>
                                </Nav>
                            </Col>
                        </Row>
                    <Row>
                    <Col md={2} className="ml-3 mt-2">
                        <Nav vertical>
                            <NavItem>
                            <h1>Avatar</h1>
                            </NavItem>
                            <NavItem>
                            <h1>Jono</h1>
                            </NavItem>
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
                        <Container className="m-3">
                            <Row className="m-2">
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="m-2">
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card > 
                                        <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Detail</Button>
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