import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

class Loader extends Component{
    
    render() {
        return(
            <>
                <div className="loader-content w-100 h-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border"/>
                </div>
            </>
        )
    }
}

/*  const mapStateToProps = state => ({
    loading: state.loader.loading
})

export default connect(mapStateToProps)(Loader) 
 */
export default Loader