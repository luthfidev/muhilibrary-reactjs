import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Notfound extends Component {
    render(){
        return(
            <>
              
                    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                       <div>
                       <h1>Opss !</h1>
                        </div> 
                        <div>
                        <h3>Page Not Found</h3>
                        </div>
                        <Link to="/" className="btn btn-outline-dark">Back</Link>
                    </div>
            
            </>
        )
    };

}

export default Notfound