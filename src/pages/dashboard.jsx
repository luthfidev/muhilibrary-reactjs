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
import qs from 'querystring';
import Chart from 'react-apexcharts';
import moment from 'moment'
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
      series: {}
    }
  }

  componentWillMount() {
    if (!this.props.auth.token) {
        this.props.history.push('/')       
    } else {
        this.fetchData()
    }  
  }  

   fetchData = async () => {
   await this.props.gettransactionschart()
   const { dataTransactionsChart } = this.props.transactions
   this.setState({ dataTransactionsChart })
   this.state.dataTransactionsChart.map((data, index) => (
   this.setState({
    datechart: data.transaction_date,
    returnbook: data.return_the_book, 
    statuschartborrow: data.borrowed 
    })
  ))
  this.setState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [moment(this.state.datechart).format('yyyy-MM')],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [this.state.returnbook],
      },
    ],
  })
  }

     render() {
      const params = qs.parse(this.props.location.search.slice(1));
      params.page = params.page || 1;
      return (
        <>
          <Row className="no-gutters w-100 h-100">
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
