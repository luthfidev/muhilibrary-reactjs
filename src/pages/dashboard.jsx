import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, 
        Row, 
        Col, 
        Jumbotron, 
        Card, 
        Carousel, 
        Pagination, 
        Dropdown } from 'react-bootstrap';
        import axios from 'axios'
import authHeader from '../services/authHeader'
import TopNavbar from './navbar'
import Sidebar from './sidebar'
import Spiner from '../components/Loader'
import {AddBook} from '../components/book/AddBook'
import qs from 'querystring'
import AsyncSelect from 'react-select/async'
import Swal from 'sweetalert2'
import coverdummy from '../assets/img/coverdummy.jpg'
import Chart from 'react-apexcharts'
const {REACT_APP_URL} = process.env

class Dashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          dataGenre: [],
          pageInfo: [],
          isLoading: false,
          addModalShow : false,
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
          
        }
        // check auth flow
        const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
            this.setState({isAdmin: user.userData.role})
          }else{
              props.history.push('/login')
            this.setState({isLogin: false})
          }
        }
      }

    fetchData = async (params) => {
    this.setState({isLoading: true})
    const param = `${qs.stringify(params)}`
        try {
            const url = `${REACT_APP_URL}books?${param}`
            const response = await axios.get(url, {headers: authHeader()})
            const {data} = response.data
            const pageInfo = response.data.pageInfo
            this.setState({data, pageInfo, isLoading: false})       
        } catch (error) {
            if (error.response=== undefined) {
                return false
            } else {
                Swal.fire({
                    title: 'Done !',
                    text: error.response.data.message,
                    icon: 'warning',
                })
            }
        }
        if (params) {
            this.props.history.push(`?${param}`)
        }
    }

    fetchDataGenre = async () => {
    this.setState({isLoading: true})
    const url = `${REACT_APP_URL}genres`
    const results = await axios.get(url, {headers: authHeader()})
    const {data} = results.data
    this.setState({dataGenre: data, isLoading: false})
    }

    async componentDidMount(){
        await this.checkLogin()
        const param = qs.parse(this.props.location.search.slice(1))
        await this.fetchData(param)
        await this.fetchDataGenre()
    }

    componentWillUnmount() {
        this.fetchData()
    }

  
    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
       
        return(
            <>
                <Row className="no-gutters w-100 h-100">
                    {this.state.isLoading &&
                        <Spiner/>  
                    }
                    {!this.state.isLoading &&(         
                        <div className="d-flex flex-row w-100">
                            <Sidebar {...this.props}/>           
                                <div className="w-100 d-flex flex-column">
                                    <div className="top-navbar sticky-top">
                                        <TopNavbar search={(query) => this.fetchData(query)}/>
                                    </div>
                                <Container fluid className="mt-4">
                                        <Jumbotron className="jumbotron-dashboard shadow">

                                        </Jumbotron>
                                        <Col>
                                        
                                    
                                        {this.state.data.length !== 0 &&(
                                        <Row>

                                        
                                        </Row>
                                        )}
                                        {this.state.data.length===0 &&(
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
                    )}       
                </Row>
            </>
        )
    };
}

export default Dashboard