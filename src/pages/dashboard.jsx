/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import Spiner from '../components/Loader'
import qs from 'querystring';
import Chart from 'react-apexcharts';
import TopNavbar from './navbar';
import Sidebar from './sidebar';

import { gettransactionschart } from '../redux/actions/transaction'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataTransactionsChart: [],
      options: {},
      series: {},
      isLoading: false,
    }
  }
  
  componentWillMount() {
    if (!this.props.auth.token) {
      this.props.history.push('/')       
    } 
  }

 async componentDidMount() {
     await this.fetchData()
 }

   fetchData = async () => {
   await this.props.gettransactionschart()

  }

     render() {
      const params = qs.parse(this.props.location.search.slice(1));
      params.page = params.page || 1;
      return (
        <>
          <Row className="no-gutters w-100 h-100">
          {this.state.isLoading &&
            <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
            <Spiner/>
            </div>
            }
            {!this.state.isLoading &&(  
            <div className="d-flex flex-row w-100">
              <Sidebar {...this.props} />
              <div className="w-100 d-flex flex-column">
                <div className="top-navbar sticky-top">
                  <TopNavbar search={(query) => this.fetchData(query)} />
                </div>
                <Container fluid className="mt-4">
                  <Col>
                    {this.state.data.length !== 0 && (
                    <Row />
                    )}
                    {this.state.data.length === 0 && (
                    <h1>{this.state.returnbook}</h1>
                    
                    )}

                  </Col>
                  <div className="d-flex justify-content-center">
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="line"
                      width="500"
                    />
                  </div>
                </Container>
              </div>
            </div> 
            )}
          </Row>
        </>
      );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions
})
const mapDispatchToProps = {
  gettransactionschart,

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

// export default Dashboard
