/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'react-bootstrap';
import axios from 'axios';
import qs from 'querystring';
import Swal from 'sweetalert2';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import authHeader from '../services/authHeader';
import TopNavbar from './navbar';
import Sidebar from './sidebar';
import Spiner from '../components/Loader';

const { REACT_APP_URL } = process.env;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],

    };
  }

  componentDidMount() {

  }

   /*  fetchData = async () => {
      try {
        this.props.showLoader()
        const url = `${REACT_APP_URL}transactions/chart`;
        const response =  await axios.get(url, { headers: authHeader() });
        const {data} = response.data 
        this.setState({data})
        this.props.hideLoader()
       var dataChart = []
        for (var i = 0; i < data.length; i++) {
            dataChart.push({
                categories: new Date(data[i].transaction_date),
                series: data[i].Borrowed
            })
        }
      
      } catch (error) {
        if (error.response === undefined) {
          return false;
        }
        Swal.fire({
          title: 'Done !',
          text: error.response.data.message,
          icon: 'warning',
        });
      }
      return true
    }
 */
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
                  <Jumbotron className="jumbotron-dashboard shadow" />
                  <Col>

                    {this.state.data.length !== 0 && (
                    <Row />
                    )}
                    {this.state.data.length === 0 && (
                    <h1>Data Not Available</h1>
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
});


export default connect(mapStateToProps, null)(Dashboard);

// export default Dashboard
