import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import qs from 'querystring'
const {REACT_APP_URL} = process.env


export class EditTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactiondate: '',
            userid: '',
            bookid: '',
            statusid: '',
            alert: '',

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
            transactiondate: this.state.transactiondate || this.props.transactiondate,
            userid: this.state.userid,
            bookid: this.state.bookid,
            statusid: this.state.statusid
        }
        const url = `${REACT_APP_URL}transactions`
        axios.post(url, qs.stringify(transactionData)).then( (response) => {
            this.setState({Msg: response.data.message})
            console.log(response)
            Swal.fire({
              title: 'Done !',
              text: this.state.Msg,
              icon: 'success',
              timer: 2000
            })
            this.setState({ redirect: this.state.redirect === false });
          })
          .catch(function (error) {
            console.log(error.response);
           }) 
           this.props.refreshdata()
           this.props.onHide()
    }
    fetchDataUser = async () => {
        const url = `${REACT_APP_URL}transactions`
        const results = await axios.get(url)
        const {dataUser} = results.data
        this.setState({dataUser})
    }
    fetchDataBook = async () => {
        const url = `${REACT_APP_URL}books`
        const results = await axios.get(url)
        const {dataBook} = results.data
        this.setState({dataBook})
    }

    async componentDidMount(){
        await this.fetchDataUser()
        await this.fetchDataBook()
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
                    <Form.Control name="transactiondate" onChange={(e) => this.handleChange(e)} type="date" placeholder="Transaction Date" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Name Borrow</Form.Label>
                    <Form.Control as="select" >
                        {this.state.dataUser.map((user, index) => (  
                             <option value={user.id} key={user.id.toString()}>{user.name}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label>Book</Form.Label>
                    <Form.Control as="select" >
                        {this.state.dataBook.map((book, index) => (  
                             <option value={book.id} key={book.id.toString()}>{book.title}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label>Status</Form.Label>
                    <Form.Control as="select" >
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
