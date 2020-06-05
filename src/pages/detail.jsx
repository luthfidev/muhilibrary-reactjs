import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap'

class Detail extends Component {
    render(){
        return(
            <>  
                <Row className="h-100 no-gutters">
                    <Row className="detail-header w-100 no-gutters">
                        <div className="btn-action d-flex flex-row w-100">
                        <Col className="back ml-3 mt-4">
                            <a href="/dashboard" className="btn-back">Back</a>
                        </Col>
                        <Row className="action mt-3 mr-3">
                            <a className="btn-edit mr-3" href="#">Edit</a>
                            <a className="btn-delete" href="#">Delete</a>
                        </Row>
                        </div>
                    </Row>
                    <Row className="detail-content w-100">
                        <Col md={6} className="ml-5 left no-gutters">
                            <div className="badge">
                                <span class="badge badge-warning p-2 text-white">Novel</span>
                            </div>
                            <div className="info d-flex flex-row justify-content-between">
                                <div className="title">
                                    <h2>Dilan 1990</h2>
                                </div>
                                <div className="status text-success">
                                    <span>Available</span>
                                </div>
                            </div>
                            <div className="release">
                                <span>20 Januari 2020</span>
                            </div>
                            <div className="description mt-4">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus explicabo sint dolores quae! Non quod mollitia commodi facilis aspernatur aperiam qui cumque consectetur ipsam fugiat! Quidem quasi corporis doloribus provident dolore blanditiis, velit magni officia voluptatibus non cumque repellat tempora tenetur tempore voluptates vero, nesciunt fugit adipisci eveniet, consequatur eos exercitationem reprehenderit cupiditate? Ipsa possimus quaerat ab consectetur ea doloremque ducimus asperiores voluptatem voluptates alias quibusdam suscipit dolor reiciendis, laudantium praesentium provident at recusandae earum eligendi facilis obcaecati inventore fugiat?</p>
                            </div>
                        </Col>
                        <Col md={5} className="right d-flex flex-column align-items-end justify-content-between">
                            <div className="cover">
                                <img src={require("../assets/img/cover-book.png")}/>
                            </div>
                            <div className="borrow mb-5">
                                <a href="#" className="btn-borrow">Borrow</a>
                            </div>
                        </Col>      
                    </Row>
                </Row>
            </>
        )
    };
}

export default Detail