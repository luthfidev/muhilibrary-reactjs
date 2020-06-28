import React, { Component } from 'react';
import {
  Container, 
  Row, 
  Table, 
  Card, 
  Badge,
  Pagination,
  Dropdown,
} from 'react-bootstrap';
import Swal from 'sweetalert2' // alert sweetalert
import qs from 'querystring'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'


import Spiner from '../components/Loader' // loader
import TopNavbar from './navbar' // topnavbar
import Sidebar from './sidebar' // sidebar

import { userhistory } from '../redux/actions/user'
import { updatetransactions } from '../redux/actions/transaction'

class userHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
          user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
          },
          dataHistoryUsers: [],
          pageInfo: [],
          isLoading: true,
          addModalShow : false,
          alert: null
        }
      }
      
      componentWillMount() {
        if (!this.props.auth.token) {
            this.props.history.push('/')       
        } else {
            this.fetchData()
        }  
      }  

      fetchData = async (params) => {
        const { token } = this.props.auth
        const param = `${qs.stringify(params)}`
        await this.props.userhistory(token, param)
        const { dataHistoryUsers, pageInfo, isLoading } = this.props.users
        this.setState({dataHistoryUsers, pageInfo, isLoading})
        if (params) {
          this.props.history.push(`?${param}`)
        }
      }

       // props cancel
       cancelTransaction = async(id) => {
        const data = {
          statusid: 4
        }
       await this.props.updatetransactions(id, data)
        this.fetchData()
      }
     
      // modal confirmation cancel
      onConfirmCancel = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "After cancel you can't revert this data",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
          if (result.value) {
            this.cancelTransaction(id)
            Swal.fire(
              'Canceled!',
              'Your book canceled.',
              'success'
            )
          }
        })
      }
    
    render(){
      const params = qs.parse(this.props.location.search.slice(1))
      params.page = params.page || 1
        return(
            <>
              {this.state.isLoading &&
                <Spiner/>
                }
                <Row className="no-gutters w-100 h-100">
                    <div className="d-flex flex-row w-100">
                        <Sidebar {...this.props}/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar search={(query) => this.fetchData(query)}/>
                                </div>
                               <Container fluid className="mt-4">
                               <Card>
                                <Card.Header>Transactions</Card.Header>
                                <Card.Body>
                                <div className="d-flex flex-row">
                                      <Dropdown className="mb-4">
                                              <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                  Limit
                                              </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, limit: '10' })}>10</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, limit: '50' })}>50</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, limit: '100' })}>100</Dropdown.Item>
                                                  </Dropdown.Menu>
                                          </Dropdown>
                                          <Dropdown className="ml-2">
                                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                                            Sort
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 0 })}>A-z</Dropdown.Item>
                                                <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 1 })}>Z-a</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>                        
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
                                    {this.state.dataHistoryUsers.length !== 0 &&(
                                    <tbody>
                                         {this.state.dataHistoryUsers.map((transaction, index) => (  
                                        <tr key={transaction.id.toString()}>
                                        <td >{index + 1}</td>
                                        <td>{moment(transaction.transaction_date).format('yyyy-MM-DD')}</td>                                
                                        <td>{transaction.name}</td>                                
                                        <td>{transaction.title}</td>                                
                                        <td><Badge variant="primary" className="font-weight-bold">{transaction.statusName}</Badge></td>                                
                                        <td align="center">
                                       {/*  <button onClick={() =>  {  this.setState({editModalShow: true, 
                                                                                    transactionid: transaction.id, 
                                                                                    transactiondate: transaction.date, 
                                                                                    userid: transaction.userid, 
                                                                                    bookid: transaction.bookid, 
                                                                                    statusid: transaction.statusid})} } className="btn btn-warning ml-2">Edit</button> */}
                                       {/*   {transaction.statusName === 'Pending' && 
                                         <button onClick={() =>  {  this.onConfirmProses(transaction.id)} } className="btn btn-warning ml-2">Proses</button>
                                         }
                                         {transaction.statusName === 'Borrowed' && 
                                         <button onClick={() =>  {  this.onConfirmReturn(transaction.id)} } className="btn btn-success ml-2">Return Book</button>
                                         } */}
                                         {transaction.statusName === 'Pending' && 
                                         <button onClick={() =>  {  this.onConfirmCancel(transaction.id)} } className="btn btn-warning ml-2">Cancel</button>
                                        }
                                        </td>                                
                                        </tr>   
                                         ))}                           
                                    </tbody>
                                    )}
                                    {this.state.dataHistoryUsers.length===0 &&(
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


const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
})
const mapDispatchToProps = {
  userhistory,
  updatetransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(userHistory)