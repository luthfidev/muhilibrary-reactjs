import React, {Component} from 'react';
import TopNavbar from '../navbar'
import Sidebar from '../sidebar'
import { Container, Row, Table, Card} from 'react-bootstrap';

class Status extends Component {

    render(){
      
        return(
            <>
                <Row className="no-gutters w-100 h-100">
                    <div className="d-flex flex-row w-100">
                        <Sidebar {...this.props}/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar/>
                                </div>
                               <Container fluid className="mt-4">
                               <Card>
                                <Card.Header>Status</Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        </tr>
                                        <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        </tr>
                                        <tr>
                                        <td>3</td>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                    </Table>
                                </Card.Body>
                                </Card>
                               </Container>
                            </div>
                    </div>        
                </Row>
            </>
        )
    };
}

export default Status