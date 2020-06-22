import React, { Component } from 'react'
import { 
    Row,
    Navbar, 
    Nav, 
    Form, 
    FormControl, 
    Button, 
    Carousel, 
} from 'react-bootstrap'
import slide1 from '../assets/img/landing/1.jpg'
import slide2 from '../assets/img/landing/2.jpg'
import slide3 from '../assets/img/landing/3.jpg'

const NavbarLanding = () => {
	return <Navbar bg="light" expand="md" className="shadow rounded">
            <Navbar.Brand href="#home">Library App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">E-books</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button className='mr-2 shadow' variant="outline-info">Login</Button>
                <Button className='shadow' variant="outline-secondary">Register</Button>
            </Form>
            </Navbar.Collapse>
        </Navbar>
}

const CarouselLanding = () => {
    return (<>
            <Carousel className="caraousel-landing shadow">
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
            </>)
}

const ListAuthor = () => {
    return(
        <>
       
        <div className="d-flex flex-column">
        <div className="landing-tittle-author">List Author</div>
            <ul>
                <li className="landing-list-author">Bibit</li>
                <li className="landing-list-author">Bibit</li>
                <li className="landing-list-author">Bibit</li>
            </ul>
            </div>
        </>
    ) 
}

const CardBook = () => {
    return(
        <>
        <div className="card-book">
            <img style={{ width: 250 }} src={require('../assets/img/dashboard/1.jpg')}/>
            <div className="card-book-text">
                <p className="m-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
            </div>
            <div className="card-book-btn d-flex justify-content-center mt-5">
                <a href="#">Borrow</a>
            </div>
        </div>
        </>
    ) 
}

export default class test extends Component {
    render() {
        return (
            <>
            <NavbarLanding/>
               
                        <Row className="body-bg no-gutters w-100">
                            <div className="d-flex justify-content-center mt-3 col-md-6">
                                <CarouselLanding/>
                            </div>
                            <div className="mt-3 col-md-6">
                                <ListAuthor/>
                            </div>
                            <div className="landing-card d-flex col-md-12">
                                <Row className="w-100 d-flex justify-content-center">
                                    <CardBook/>
                                    <CardBook/>
                                    <CardBook/>
                                    <CardBook/>
                                    <CardBook/>
                                    <CardBook/>
                                    <CardBook/>
                                    <CardBook/>
                                </Row>
                            </div>
                        </Row>
          
            </>
        )
    }
}
