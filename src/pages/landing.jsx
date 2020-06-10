import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Spiner from '../components/Loader'
import SpinerContent from '../components/LoaderContent'
import { Row, Navbar, Nav, NavDropdown, Form, FormControl, Button, Carousel } from 'react-bootstrap';
import qs from 'querystring'

import bgLanding from '../assets/img/bg-landing.jpg'

class Landing extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          pageInfo: [],
          isLoading: false,
          addModalShow : false
        }
      }

      fetchData = async (params) => {
            this.setState({isLoading: true})
            const {REACT_APP_URL} = process.env
            const param = `${qs.stringify(params)}`
            const url = `${REACT_APP_URL}books?${param}`
            const results = await axios.get(url)
            const {data} = results.data
            
            const pageInfo = results.data.pageInfo
            this.setState({data, pageInfo, isLoading: false})
            if (params) {
                this.props.history.push(`?${param}`)
            }
      }


      async componentDidMount(){
   /*        const results = await axios.get('https://api-muhilibrary.herokuapp.com/books?limit=10')
          const {data} = results
          this.setState(data)  */
          const param = qs.parse(this.props.location.search.slice(1))
          await this.fetchData(param)
      }


    /*  filterColors = (inputValue) => {
        return this.fetchData.genreName.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      };
    */
   
 /*     promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(filterColors(inputValue));
            }, 1000);
        });  */


    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        let addModalClose = () => this.setState({addModalShow:false})
        return(
            <>
                <Row className="no-gutters w-100 h-100">
                <Navbar className="w-100" bg="light" expand="lg">
                <Navbar.Brand href="#home">Muhilibrary</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <div className="action-landing w-100 d-flex justify-content-end">
                    <Button size="sm" variant="outline-primary" className="mr-2">Login</Button>
                    <Button size="sm" variant="outline-info">Register</Button>
                </div>
                </Navbar.Collapse>
                </Navbar>
                    <div className="landing-header">
                   <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/bF2vsubyHcQ/1920x1080"
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/bF2vsubyHcQ/1920x1080"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://source.unsplash.com/bF2vsubyHcQ/1920x1080"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    </Carousel>
                    </div>
                    <div className="search-book d-flex w-100 justify-content-center align-content-center">
                            <Form inline onSubmit={(e) => e.preventDefault()}>
                            <FormControl type="text" placeholder="Search" onKeyDown={(e) => this.search(e)} onChange={(e) => this.setState({ query: e.target.value })} className="mr-sm-2" />
                            </Form>
                    </div>
                </Row>
            </> 
        )
    };
}

export default Landing