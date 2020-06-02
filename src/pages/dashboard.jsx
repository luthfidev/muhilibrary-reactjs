import React, {Component} from 'react';

class Dashboard extends Component {
    render(){
        return(
                <>      
                        <div className="dashboard">
                        <div className="sidebar">
                            <div className="profile">
                                <div className="profile-img">
                                    <img src={require("../assets/img/jono.png")} className="profile-img" alt="profile-picture"/>
                                </div>
                                <div className="profile-name">Jono</div>
                            </div>
                            <ul className="menu">
                                <li className="item">Explore</li>
                                <li className="item">History</li>
                                <li className="item">Add Book</li>
                            </ul>
                       </div>
                       <div className="content">
                            <div className="navbar">
                                <ul className="navbar-item">
                                    <li>All Category</li>
                                    <li>All Time</li>
                                </ul>
                                <div className="search-wraper">
                                    <input className="input-search" placeholder="search book"/>
                                </div>
                                <div className="brand">
                                <img className="icon" src={require("../assets/img/bookshelf.png")} alt="logo"/>
                                <div className="text">Library</div>
                            </div>
                            </div>

                            <div className="container">
                                <h3>List Book</h3>
                                <div className="list-book">
                                    <div className="card">
                                        <div className="card-img"></div>
                                        <div className="card-text">
                                            <div className="title">
                                                <div className="desc">
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quia tempore asperiores eligendi provident veniam autem sint soluta dolor fugiat nam minus repudiandae, architecto rem quae eum eius illo voluptatibus!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-img"></div>
                                        <div className="card-text">
                                            <div className="title">
                                                <div className="desc">
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quia tempore asperiores eligendi provident veniam autem sint soluta dolor fugiat nam minus repudiandae, architecto rem quae eum eius illo voluptatibus!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-img"></div>
                                        <div className="card-text">
                                            <div className="title">
                                                <div className="desc">
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quia tempore asperiores eligendi provident veniam autem sint soluta dolor fugiat nam minus repudiandae, architecto rem quae eum eius illo voluptatibus!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-book">
                                    <div className="card">
                                        <div className="card-img"></div>
                                        <div className="card-text">
                                            <div className="title">
                                                <div className="desc">
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quia tempore asperiores eligendi provident veniam autem sint soluta dolor fugiat nam minus repudiandae, architecto rem quae eum eius illo voluptatibus!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-img"></div>
                                        <div className="card-text">
                                            <div className="title">
                                                <div className="desc">
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quia tempore asperiores eligendi provident veniam autem sint soluta dolor fugiat nam minus repudiandae, architecto rem quae eum eius illo voluptatibus!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-img"></div>
                                        <div className="card-text">
                                            <div className="title">
                                                <div className="desc">
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quia tempore asperiores eligendi provident veniam autem sint soluta dolor fugiat nam minus repudiandae, architecto rem quae eum eius illo voluptatibus!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>    
                       </div>
                       </div>
                </>
        )
    };
}

export default Dashboard