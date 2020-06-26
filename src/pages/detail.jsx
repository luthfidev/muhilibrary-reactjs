import React, {Component} from 'react';
import {
    Row, 
    Col,
    Badge,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import moment from 'moment'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import qs from 'querystring'
// file form modal edit book
import EditBook from '../components/book/EditBook'

import { login } from '../redux/actions/auth'
import { deletebooks, detailbooks } from '../redux/actions/book'
import { borrow } from '../redux/actions/transaction'


class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
          user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
          },
            dataBooks: [],
            id: props.match.params.id,
            bookid: props.location.state.bookid,
            transactiondate: moment().format('yyyy-MM-DD'),
            editModalShow: false
        }
      }

      componentWillMount() {
        if (!this.props.auth.token) {
          this.props.history.push('/')
        }   
      } 

      componentDidMount() {
        this.fetchData()       
      } 

      fetchData = async () => {
        await this.props.detailbooks(this.state.bookid)
        const { dataBooks } = this.props.books
        this.setState({dataBooks})
        this.state.dataBooks.map((books, index) => (
          this.setState({
            bookid: books.id,
            booktitle: books.title,
            bookrelease: books.releaseDate,
            bookgenreid: books.genreId,
            bookgenre: books.genreName,
            bookimage: books.image,
            bookdesc: books.description,
            bookauthorid: books.authorId,
            bookauthor: books.authorName,
            bookstatusid: books.nameStatusId,
            bookstatus: books.nameStatus,
          })
        ))
      }

      handlePost = (event) => {
       event.preventDefault()
       const { token } = this.props.auth
        const borrowData = {
            bookid: this.state.bookid,
            transactiondate: this.state.transactiondate
        } 
        this.props.borrow(token, qs.stringify(borrowData))
        this.props.history.push('/dashboard')
      }


     // props delete
      deleteBook = async(id) => {
      const { token } = this.props.auth
      this.props.deletebooks(token, id)
      this.props.history.push('/dashboard')
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
            this.deleteBook(id)
            this.props.history.push('/dashboard')
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
          }
        })
      }

    render(){
        const { token } = this.props.auth
        const { role } = this.state.user

       // set state editModal close
        let editModalClose = () => this.setState({editModalShow:false})

        let tooltip1 = <Tooltip><strong>Login First to Borrow </strong> Book</Tooltip>;
        return(
            <>  
           
                <Row className="h-100 w-100 no-gutters">
                    <div className="detail-header ">
                        <div className="btn-action p-3 w-100 d-flex justify-content-between"> 
                            <div className="btn-back">
                            {token && (
                              <Link to="/dashboard" className="ml-2 btn btn-info"> Back</Link>
                            )}
                            {!token && (
                              <Link to="/" className="ml-2 btn btn-info"> Back</Link>
                            )}
                            </div>
                            <div className="action">
                      {token && role === 'admin' && (<>
                                <button  onClick={() =>  {  this.setState({editModalShow: true, 
                                                                                    bookid: this.state.bookid, 
                                                                                    booktitle: this.state.booktitle, 
                                                                                    bookrelease: this.state.bookrelease,
                                                                                    bookgenreid: this.state.bookgenreid,
                                                                                    bookgenre: this.state.bookgenre,
                                                                                    bookimage: this.state.bookimage,
                                                                                    bookdesc: this.state.bookdesc,
                                                                                    bookauthorid: this.state.bookauthorid,
                                                                                    bookauthor: this.state.bookauthor,
                                                                                    bookstatusid: this.state.bookstatusid,
                                                                                    bookstatus: this.state.bookstatus,
                                                                                    })} } className="btn btn-warning ml-2">Edit</button>
                                <button onClick={() =>  {  this.onConfirmDelete(this.state.id)} } className="btn btn-danger ml-2">Delete</button> 
                            </>)} 
                        <EditBook
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                refreshdata={() => this.fetchData()}
                                bookid = {this.state.bookid}
                                booktitle = {this.state.booktitle}
                                bookrelease = {this.state.bookrelease}
                                bookgenreid = {this.state.bookgenreid}
                                bookgenre = {this.state.bookgenre}
                                bookimage = {this.state.bookimage}
                                bookdesc = {this.state.bookdesc}
                                bookauthorid = {this.state.bookauthorid}
                                bookauthor = {this.state.bookauthor}
                                bookstatusid = {this.state.bookstatusid}
                                bookstatus = {this.state.bookstatus}
                                    /> 
                            </div>
                        </div>
                    </div>
                    <div className="detail-content w-100 no-gutters">
                        <Row className="h-100 no-gutters">
                            <Col md={6}>
                                <div className="left ml-5 mt-4">
                                    <Badge variant="warning">{this.state.bookgenre}</Badge>
                                    <div className="info d-flex d-flex-column justify-content-between align-items-center">
                                        <div className="title font-weight-bold"><h1>{this.state.booktitle}</h1></div>
                                        <div className="status text-success"><h5>{this.state.bookstatus}</h5></div>
                                    </div>
                                    <div className="release-date">
                                        <h5>{moment(this.state.bookrelease).format('yyyy-MM-DD')}</h5>
                                    </div>
                                    <div className="description">
                                        <p>{this.state.bookdesc}</p>
                                    </div>
                                </div> 

                            </Col>
                            <Col md={6}>
                                <div className="right mr-4 h-100 d-flex flex-column align-items-end justify-content-between">
                                    <div className="cover-img d-none d-sm-block">
                                        <img style={{width: 200, height: 300}} src={this.state.bookimage} alt="cover"/>
                                    </div>
                                    <div className="borrow">
                                    { this.state.bookstatus === 'Available' && role === 'user' && 
                                   <button onClick={(e) => this.handlePost(e)} className="btn btn-outline-success mb-5 ml-2">Borrow</button> 
                                    }
                                    {!token &&
                                     <OverlayTrigger placement="top" overlay={tooltip1}>
                                     <button className="btn btn-outline-success mb-5 ml-2">Borrow</button> 
                                     </OverlayTrigger>
                                    }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </>
        )
    };
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  books: state.books,
  transaction: state.transaction,
})
const mapDisPatchProps = {
  login,
  deletebooks,
  detailbooks,
  borrow,
}

export default connect(mapStateToProps, mapDisPatchProps)(Detail)