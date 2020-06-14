import React, {Component} from 'react';
import {Container, 
        Row, 
        Table, 
        Card, 
        Pagination, 
        Badge} from 'react-bootstrap';
import qs from 'querystring'
import Swal from 'sweetalert2' // alert sweetalert
import Spiner from '../components/Loader' // loader
import TopNavbar from './navbar' // topnavbar
import Sidebar from './sidebar' // sidebar
import authHeader from '../services/authHeader'
import axios from 'axios' // rest client

class userHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
          data: [],
          pageInfo: [],
          isLoading: false,
          addModalShow : false,
          alert: null
        }
      }
      // get data
      fetchData = async () => {
        /* this.setState({isLoading: true}) */
        const {REACT_APP_URL} = process.env
        try {
          const url = `${REACT_APP_URL}transactions/userstatus`
          const results = await axios.get(url, {headers: authHeader()})
            const {data} = results.data
            this.setState({data, isLoading: false})
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
      }
       // props delete
       deleteTransaction = async(id) => {
        this.setState({isLoading: true})
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}transactions/${id}`
        await axios.delete(url)
        this.fetchData()
      }
       // props delete
       prosesBook = async(id) => {
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}transactions/${id}`
        const data = {
          statusid: 2
        }
        await axios.patch(url, data)
        this.fetchData()
      }
       // props delete
       returnBook = async(id) => {
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}transactions/${id}`
        const data = {
          statusid: 1
        }
        await axios.patch(url, data)
        this.fetchData()
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

    async componentDidMount(){
       await this.fetchData()
    }
    
    render(){

         // state for edit modal close
         const {transactionid, transactiondate, userid, bookid, statusid} = this.state

         // set state addModal
         let addModalClose = () => this.setState({addModalShow:false})
 
         // set edit editModal close
         let editModalClose = () => this.setState({editModalShow:false})
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
                                    <TopNavbar/>
                                </div>
                               <Container fluid className="mt-4">
                               <Card>
                                <Card.Header>Transactions</Card.Header>
                                <Card.Body>                        
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
                                        <td><Badge variant="info" className="font-weight-bold">{transaction.statusName}</Badge></td>                                
                                        <td align="center">
                                       {/*  <button onClick={() =>  {  this.setState({editModalShow: true, 
                                                                                    transactionid: transaction.id, 
                                                                                    transactiondate: transaction.date, 
                                                                                    userid: transaction.userid, 
                                                                                    bookid: transaction.bookid, 
                                                                                    statusid: transaction.statusid})} } className="btn btn-warning ml-2">Edit</button> */}
                                         {transaction.statusName === 'Pending' && 
                                         <button onClick={() =>  {  this.onConfirmProses(transaction.id)} } className="btn btn-warning ml-2">Proses</button>
                                         }
                                         {transaction.statusName === 'Borrowed' && 
                                         <button onClick={() =>  {  this.onConfirmReturn(transaction.id)} } className="btn btn-success ml-2">Return Book</button>
                                         }
                                         <button onClick={() =>  {  this.onConfirmDelete(transaction.id)} } className="btn btn-danger ml-2">Delete</button>
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
                                  {/*   <Pagination>
                                            <Pagination.First onClick={()=>this.fetchData({...params, page: parseInt(params.page)-1})}/>
                                            <Pagination.Prev />
                                            {[...Array(this.state.pageInfo.totalPage)].map((o, i)=>{
                                             return (
                                            <Pagination.Item onClick={()=>this.fetchData({...params, page: params.page? i+1 : i+1})} className='mr-1 ml-1' key={i.toString()}>{i+1}</Pagination.Item>
                                             )
                                            })}
                                            <Pagination.Next onClick={()=>this.fetchData({...params, page: parseInt(params.page)+1})}/>
                                            <Pagination.Last />
                                    </Pagination> */}
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

export default userHistory