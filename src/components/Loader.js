import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

class Spiner extends Component{
    
    render() {

        const {loading} = this.props
        if(!loading) return null
        
        return(
            <>
                <div className="loader-content w-100 h-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" />
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loader.loading
})

export default connect(mapStateToProps)(Spiner)

// export default Spiner