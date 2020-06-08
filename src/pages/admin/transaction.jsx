import React, {Component} from 'react';
import TopNavbar from '../navbar'
import Sidebar from '../sidebar'
import { Container, Row, Table, Card, Pagination} from 'react-bootstrap';
import qs from 'querystring'
import axios from 'axios'

class Transaction extends Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          pageInfo: [],
          isLoading: false
        }
      }

      fetchData = async (params) => {
            this.setState({isLoading: true})
            const {REACT_APP_URL} = process.env
            const param = `${qs.stringify(params)}`
            const url = `${REACT_APP_URL}transactions?${param}`
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
         


    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1
        return(
            <>
            
                <Row className="no-gutters w-100 h-100">
                    <div className="d-flex flex-row w-100">
                        <Sidebar/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar/>
                                </div>
                               <Container fluid className="mt-4">
                               <Card>
                                <Card.Header>Transactions</Card.Header>
                                <Card.Body>
                                <button className="btn btn-success mb-2">Add</button>
                                    <Table striped bordered hover>
                                    <thead align="center">
                                        <tr>
                                        <th>No</th>
                                        <th>Transaction Date</th>
                                        <th>Name</th>
                                        <th>Title Book</th>
                                        <th>Status Transaksi</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    {this.state.data.length !== 0 &&(
                                    <tbody>
                                         {this.state.data.map((transaction, index) => (  
                                        <tr key={transaction.id.toString()}>
                                        <td >{index + 1}</td>
                                        <td>{transaction.transaction_date}</td>                                
                                        <td>{transaction.name}</td>                                
                                        <td>{transaction.title}</td>                                
                                        <td>{transaction.statusName}</td>                                
                                        <td align="center">
                                        <button  className="btn btn-warning ml-2">Edit</button>
                                        <button className="btn btn-danger ml-2">Delete</button>
                                        </td>                                
                                        </tr>   
                                         ))}                           
                                    </tbody>
                                    )}
                                    {this.state.data.length===0 &&(
                                        <h1>Data Not Available</h1>
                                    )}
                                    </Table>
                                    <div className="d-flex justify-content-center">
                                    <Pagination>
                                            <Pagination.First onClick={()=>this.fetchData({...params, page: parseInt(params.page)-1})}/>
                                            <Pagination.Prev />
                                            {[...Array(this.state.pageInfo.totalPage)].map((o, i)=>{
                                             return (
                                            <Pagination.Item onClick={()=>this.fetchData({...params, page: params.page? i+1 : i+1})} className='mr-1 ml-1' key={i.toString()}>{i+1}</Pagination.Item>
                                             )
                                            })}
                                            <Pagination.Next onClick={()=>this.fetchData({...params, page: parseInt(params.page)+1})}/>
                                            <Pagination.Last />
                                    </Pagination>
                                    </div>
                                </Card.Body>
                                </Card>
                               </Container>
                            </div>
                    </div>        
                </Row>
            </>
        )
    };
}

export default Transaction