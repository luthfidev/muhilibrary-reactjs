import React, {Component} from 'react';
import { 
  Container, 
  Row, 
  Table, 
  Card, 
  Pagination, 
  Badge, 
  Dropdown,
} from 'react-bootstrap';
import { connect } from 'react-redux'
import qs from 'querystring'
import Swal from 'sweetalert2'
import moment from 'moment'

import TopNavbar from '../navbar'
import Sidebar from '../sidebar'
import Spiner from '../../components/Loader'

// file form modal Add
import {AddTransaction} from '../../components/transaction/AddTransaction' 

import { gettransactions, updatetransactions, deletetransactions } from '../../redux/actions/transaction'

class Transaction extends Component {
    constructor(props){
        super(props)
        this.state = {
          dataTransactions: [],
          data: [],
          pageInfo: [],
          isLoading: true,
          addModalShow : false,
          alert: null
        }
    }

      componentDidMount() {
        this.fetchData()
      }

      // get data
      fetchData = async (params) => {
        const param = `${qs.stringify(params)}`
        await this.props.gettransactions(param)
        const { dataTransactions, pageInfo, isLoading } = this.props.transactions
        this.setState({dataTransactions, pageInfo, isLoading})
        if (params) {
          this.props.history.push(`?${param}`)
        }
      }

      cancelTransaction = async(id) => {
        const data = {
          statusid: 4
        }
       await this.props.updatetransactions(id, data)
        this.fetchData()
      }
  
      // props delete
      prosesBook = async(id) => {
        const data = {
          statusid: 2
        }
        await this.props.updatetransactions(id, data)
        this.fetchData()
      }

      // props delete
      returnBook = async(id) => {
        const data = {
          statusid: 1
        }
       await this.props.updatetransactions(id, data)
        this.fetchData()
      }
      
      // props delete
      deleteTransaction = async(id) => {
       await this.props.deletetransactions(id)
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

      // modal confirmation delete
      onConfirmDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "After delete you can't revert this data",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.deleteTransaction(id)
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
          }
        })
      }

      onConfirmProses = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "After prosess you can't revert this",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, prosess it!'
        }).then((result) => {
          if (result.value) {
            this.prosesBook(id)
            Swal.fire(
              'Prosess it!',
              'Prosess success!',
              'success'
            )
          }
        })
      }

      onConfirmReturn = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "After prosess you can't revert this",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, prosess it!'
        }).then((result) => {
          if (result.value) {
            this.returnBook(id)
            Swal.fire(
              'Prosess it!',
              'Prosess success!',
              'success'
            )
          }
        })
      } 
    
    render(){
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1

         // set state addModal
         let addModalClose = () => this.setState({addModalShow:false})

        return(
            <>
                <Row className="no-gutters w-100 h-100">
                {this.state.isLoading &&
                <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                <Spiner/>
                </div>
                }
                 {!this.state.isLoading &&(   
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
                                    <div className="d-flex flex-row ">
                                      <div className="action-btn mr-2">
                                        <button onClick={()=> this.setState({addModalShow: true})} className="btn btn-success mb-2">Add</button>
                                      </div>
                                          {/* component modal add */}
                                          <AddTransaction
                                              show={this.state.addModalShow}
                                              onHide={addModalClose}
                                              refreshdata={() => this.fetchData()}
                                          />
                                          <Dropdown className="mb-4">
                                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                  Status
                                              </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                  <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: '' })}>All</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: 'Pending' })}>Pending</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: 'Return the Book' })}>Return the Book</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, search: 'Borrowed' })}>Borrowed</Dropdown.Item>
                                                  </Dropdown.Menu>
                                          </Dropdown>
                                          <Dropdown className="ml-2 mb-4">
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
                                    {this.state.dataTransactions.length !== 0 &&(
                                    <tbody>
                                         {this.state.dataTransactions.map((transaction, index) => (  
                                        <tr key={transaction.id.toString()}>
                                        <td >{index + 1}</td>
                                        <td>{moment(transaction.transaction_date).format('yyyy-MM-DD')}</td>                                
                                        <td>{transaction.name}</td>                                
                                        <td>{transaction.title}</td>                                
                                        <td><Badge variant="primary" className="font-weight-bold">{transaction.statusName}</Badge></td>                                
                                        <td align="left">
                                         {transaction.statusName === 'Pending' && (<>
                                         <button onClick={() =>  {  this.onConfirmProses(transaction.id)} } className="btn btn-info ml-2">Proses</button>
                                         <button onClick={() =>  {  this.onConfirmCancel(transaction.id)} } className="btn btn-warning ml-2">Cancel</button>
                                         </>)}
                                         {transaction.statusName === 'Borrowed' && 
                                         <button onClick={() =>  {  this.onConfirmReturn(transaction.id)} } className="btn btn-success ml-2">Return Book</button>
                                         }
                                         <button onClick={() =>  {  this.onConfirmDelete(transaction.id)} } className="btn btn-danger ml-2">Delete</button>
                                        </td>                         
                                        </tr>   
                                         ))}                           
                                    </tbody>
                                    )}
                                    {this.state.dataTransactions.length===0 &&(
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
                )}           
                </Row>
            </>
        )
    };
}

// export default Transaction
const mapStateToProps = (state) => ({
  transactions: state.transactions
})
const mapDispatchToProps = {
  gettransactions,
  updatetransactions,
  deletetransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)