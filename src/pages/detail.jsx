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
import axios from 'axios'
import moment from 'moment'
import authHeader from '../services/authHeader'
import qs from 'querystring'
// file form modal edit book
import {EditBook} from '../components/book/EditBook'
const {REACT_APP_URL} = process.env
class Detail extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.id,
            bookid: props.location.state.bookid,
            booktitle: props.location.state.booktitle,
            bookrelease: props.location.state.bookrelease,
            bookimage: props.location.state.bookimage,
            bookdesc: props.location.state.bookdesc,
            bookgenreid: props.location.state.bookgenreid,
            bookgenre: props.location.state.bookgenre,
            bookauthorid: props.location.state.bookauthorid,
            bookauthor: props.location.state.bookauthor,
            bookstatusid: props.location.state.bookstatusid,
            bookstatus: props.location.state.bookstatus,
            transactiondate: moment().format('yyyy-MM-DD'),

            editModalShow: false
        }
        const user = JSON.parse(localStorage.getItem('user'))
        this.checkLogin = () => {
          if(user){
            this.setState({isLogin: true})
            this.setState({isAdmin: user.userData.role})
            
          }else{
            this.setState({isLogin: false})
          }
        }
        this.handlePost = this.handlePost.bind(this)
        
      }
          handlePost = () => {
              this.setState({isLoading: true})
              const borrowData = {
                  bookid: this.state.bookid,
                  transactiondate: this.state.transactiondate
              }
              const url = `${REACT_APP_URL}transactions/user`
              axios.post(url, qs.stringify(borrowData), {headers: authHeader()}).then( (response) => {
                  Swal.fire({
                    title: 'Done !',
                    text:  response.data.message,
                    icon: 'success',
                    timer: 2000
                  })
                })
                .catch(function (error) {
                  Swal.fire({
                    title: 'Done !',
                    text:  'Please Update Name your profile first',
                    icon: 'warning',
                  })
                 }) 
                 this.props.history.push('/dashboard')
          }

     // props delete
     deleteBook = async(id) => {
        const {REACT_APP_URL} = process.env
        const url = `${REACT_APP_URL}books/${id}`
        await axios.delete(url, {headers: authHeader()})
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

      componentDidMount(){
        this.checkLogin()

      }
    
    render(){
        const {bookid, 
              booktitle, 
              bookrelease, 
              bookgenre, 
              bookgenreid, 
              bookimage, 
              bookdesc, 
              bookauthor, 
              bookauthorid, 
              bookstatus, 
              bookstatusid} = this.state

       // set state editModal close
        let editModalClose = () => this.setState({editModalShow:false})

        let tooltip1 = <Tooltip><strong>Login First to Borrow </strong> Book</Tooltip>;
        return(
            <>  
           
                <Row className="h-100 w-100 no-gutters">
                    <div className="detail-header ">
                        <div className="btn-action p-3 w-100 d-flex justify-content-between"> 
                            <div className="btn-back">
                            {this.state.isLogin && (
                            <Link to="/dashboard" className="ml-2 btn btn-info"> Back</Link>
                            )}
                            {!this.state.isLogin && (
                            <Link to="/" className="ml-2 btn btn-info"> Back</Link>
                            )}
                            </div>
                            <div className="action">
                            {this.state.isLogin && this.state.isAdmin === 'admin' && (<>
                                <button  onClick={() =>  {  this.setState({editModalShow: true, 
                                                                                    bookid: this.state.id, 
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
                                bookid = {bookid}
                                booktitle = {booktitle}
                                bookrelease = {bookrelease}
                                bookgenreid = {bookgenreid}
                                bookgenre = {bookgenre}
                                bookimage = {bookimage}
                                bookdesc = {bookdesc}
                                bookauthorid = {bookauthorid}
                                bookauthor = {bookauthor}
                                bookstatusid = {bookstatusid}
                                bookstatus = {bookstatus}
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
                                        <img src={this.state.bookimage} alt="cover"/>
                                    </div>
                                    <div className="borrow">
                                    { this.state.bookstatus === 'Available' && this.state.isAdmin === 'user' && 
                                   <button onClick={(e) => this.handlePost(e)} className="btn btn-outline-success mb-5 ml-2">Borrow</button> 
                                    }
                                    {!this.state.isLogin &&
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

export default Detail