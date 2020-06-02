import React, {Component} from 'react';

class Detail extends Component {
    render(){
        return(
            <>  
                <div className="detail">
                    <div className="detail-header">
                        <div className="back">
                            <a href="#" className="btn-back">Back</a>
                        </div>
                        <div className="action">
                            <a href="#">Edit</a>
                            <a href="#">Delete</a>
                        </div>
                    </div>
                    <div className="detail-content">
                        <div className="left">
                            <div className="badge">
                                <span>Novel</span>
                            </div>
                            <div className="info">
                                <div className="title">
                                    <h2>Dilan 1990</h2>
                                </div>
                                <div className="status">
                                    <span>Available</span>
                                </div>
                            </div>
                            <div className="release">
                                <span>20 Januari 2020</span>
                            </div>
                            <div className="description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus explicabo sint dolores quae! Non quod mollitia commodi facilis aspernatur aperiam qui cumque consectetur ipsam fugiat! Quidem quasi corporis doloribus provident dolore blanditiis, velit magni officia voluptatibus non cumque repellat tempora tenetur tempore voluptates vero, nesciunt fugit adipisci eveniet, consequatur eos exercitationem reprehenderit cupiditate? Ipsa possimus quaerat ab consectetur ea doloremque ducimus asperiores voluptatem voluptates alias quibusdam suscipit dolor reiciendis, laudantium praesentium provident at recusandae earum eligendi facilis obcaecati inventore fugiat?</p>
                            </div>
                        </div>
                        <div className="right">
                            <div className="cover">
                                <img src={require("../assets/img/cover-book.png")}/>
                            </div>
                            <div className="borrow">
                                <a href="#" className="btn-borrow">Borrow</a>
                            </div>
                        </div>      
                    </div>
                </div>
            </>
        )
    };
}

export default Detail