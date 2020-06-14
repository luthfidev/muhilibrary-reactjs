import React, {Component} from 'react'
import {Modal, 
        Button, 
        Form} from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import qs from 'querystring'
const {REACT_APP_URL} = process.env

export class AddTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactiondate: '',
            userid: '',
            bookid: '',
            statusid: '',
            alert: '',
            dataUser: [],
            dataBook: [],

        }
        this.handlePost = this.handlePost.bind(this)
    }
    
    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }
       handlePost = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        const transactionData = {
            transactiondate: this.state.transactiondate,
            userid: this.state.userid,
            bookid: this.state.bookid,
            statusid: this.state.statusid
        }
        const url = `${REACT_APP_URL}transactions`
        axios.post(url, qs.stringify(transactionData)).then((response) => {
            this.setState({Msg: response.data.message})
            Swal.fire({
              title: 'Done !',
              text: this.state.Msg,
              icon: 'success',
              timer: 2000
            })
            this.setState({ redirect: this.state.redirect === false });
          })
          .catch(function (error) {;
           }) 
           this.props.refreshdata()
           this.props.onHide()
           console.log(this.state)
    }
  fetchDataUser = async () => {
        const url = `${REACT_APP_URL}users`
        const results = await axios.get(url)
        const {data} = results.data
        this.setState({dataUser: data})
    }
  fetchDataBook = async () => {
      const url = `${REACT_APP_URL}books`
      const results = await axios.get(url)
      const {data} = results.data
      this.setState({dataBook: data})
  }

 componentDidMount() {
   this.fetchDataUser()
   this.fetchDataBook()
 }

    render(){
      
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Transaction
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control name="transactiondate" value={this.state.transactiondate} onChange={(e) => this.handleChange(e)} type="date" placeholder="Transaction Date" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Name Borrow</Form.Label>
                    <Form.Control as="select" name="userid" value={this.state.userid} onChange={(e) => this.handleChange(e)}>
                    {this.state.dataUser.map((user, index) => (  
                        <option value={user.id} key={user.id.toString()}>{user.name}</option>
                    ))}   
                    
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label>Book</Form.Label>
                    <Form.Control as="select" name="bookid" onChange={(e) => this.handleChange(e)}>
                    {this.state.dataBook.map((book, index) => (  
                             <option value={book.id} key={book.id.toString()}>{book.title}</option>
                    ))}  
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="statusid" onChange={(e) => this.handleChange(e)}>
                        <option value="1">Retrun the book</option>
                        <option value="2">Borrowed</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button varian="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
       
        )
    }
}
