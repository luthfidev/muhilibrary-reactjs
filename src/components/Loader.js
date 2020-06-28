import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

class Loader extends Component{
    
    render() {
        return(
            <>
                <div >
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