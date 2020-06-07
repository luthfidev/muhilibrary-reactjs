import React, {Component} from 'react';
import {
    Row, 
    Col,
    Badge
   } from 'react-bootstrap'

import { Link } from 'react-router-dom';

import cover from '../assets/img/cover-book.png'

class Detail extends Component {
    render(){
        return(
            <>  
                <Row className="h-100 w-100 no-gutters">
                    <div className="detail-header ">
                        <div className="btn-action p-3 w-100 d-flex justify-content-between"> 
                            <div className="btn-back">
                            <Link to="/dashboard" className="ml-2 btn btn-outline-dark"> Back</Link>
                            </div>
                            <div className="action">
                                <Link to="/edit" className="ml-2 btn btn-outline-dark"> Edit</Link>
                                <Link to="/delete" className="ml-2 btn btn-outline-dark"> Delete</Link>
                            </div>
                        </div>
                    </div>
                    <div className="detail-content w-100 no-gutters">
                        <Row className="h-100 no-gutters">
                            <Col md={6}>
                                <div className="left ml-5 mt-4">
                                    <Badge variant="warning">Novel</Badge>
                                    <div className="info d-flex d-flex-column justify-content-between align-items-center">
                                        <div className="title font-weight-bold"><h1>Dilan</h1></div>
                                        <div className="status text-success"><h5>Available</h5></div>
                                    </div>
                                    <div className="release-date">
                                        <h5>30 Juni 2019</h5>
                                    </div>
                                    <div className="description">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum pariatur non magni, placeat ea accusantium aspernatur nam tenetur rerum? Similique enim quis deleniti ex ducimus natus, asperiores et laudantium rerum corrupti repellat odit voluptates modi velit! Veritatis et incidunt iure, odit consectetur vitae illum, minima soluta commodi sed totam rerum?</p>
                                    </div>
                                </div> 

                            </Col>
                            <Col md={6}>
                                <div className="right mr-4 h-100 d-flex flex-column align-items-end justify-content-between">
                                    <div className="cover-img d-none d-sm-block">
                                        <img src={cover} alt="cover"/>
                                    </div>
                                    <div className="borrow">
                                    <Link to="/borrow" className="mr-4 p-2 mb-5 btn btn-warning"> Borrow</Link>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </div>
                </Row>
            </>
        )
    };
}

export default Detail