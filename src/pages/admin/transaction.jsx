import React, {Component} from 'react';
import TopNavbar from '../navbar'
import Sidebar from '../sidebar'
import { Container, Row, Table, Card, Pagination} from 'react-bootstrap';
import qs from 'querystring'
import axios from 'axios'
import Swal from 'sweetalert2'

// file form modal Add
import {AddTransaction} from '../../components/transaction/AddTransaction' 
// file form modal edit
import {EditTransaction} from '../../components/transaction/EditTransaction'

class Transaction extends Component {

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

       // props delete
       deleteTransaction = async(id) => {
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}transactions/${id}`
        await axios.delete(url)
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

         // state for edit modal close
         const {transactionid, transactiondate, userid, bookid, statusid} = this.state

         // set state addModal
         let addModalClose = () => this.setState({addModalShow:false})
 
         // set edit editModal close
         let editModalClose = () => this.setState({editModalShow:false})
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
                                <button onClick={()=> this.setState({addModalShow: true})} className="btn btn-success mb-2">Add</button>
                                    {/* component modal add */}
                                    <AddTransaction
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        refreshdata={() => this.fetchData()}
                                    />

                                      {/* component modal edit */}
                                     {/* <EditTransaction
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        refreshdata={() => this.fetchData()}
                                        transactionid = {transactionid}
                                        transactiondate = {transactiondate}
                                        userid = {userid}
                                        bookid = {bookid}
                                        stausid = {statusid}
                                    /> */}
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
                                        <button onClick={() =>  {  this.setState({editModalShow: true, 
                                                                                    transactionid: transaction.id, 
                                                                                    transactiondate: transaction.date, 
                                                                                    userid: transaction.userid, 
                                                                                    bookid: transaction.bookid, 
                                                                                    statusid: transaction.statusid})} } className="btn btn-warning ml-2">Edit</button>
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