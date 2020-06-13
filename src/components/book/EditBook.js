import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import qs from 'querystring'
import authHeader from '../../services/authHeader'
const {REACT_APP_URL} = process.env


export class EditBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            image: '',
            genreid: '',
            authorid: '',
            statusid: '',
            releasedate: '',
            dataGenre:[],
            dataAuthor:[],
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
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.set('title', this.state.title || this.props.booktitle)
        formData.set('description', this.state.description || this.props.bookdesc)
        formData.set('genreid', this.state.genreid || this.props.bookgenreid)
        formData.set('authorid', this.state.authorid || this.props.bookauthorid)
        formData.set('releasedate', this.state.releasedate || this.props.bookrelease)
        formData.set('statusid', this.state.statusid || this.props.booktitle)

        const url = `${REACT_APP_URL}books/${this.props.bookid}`
        axios.patch(url, formData, {headers: authHeader()}).then( (response) => {
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
           this.props.onHide()
    }

    // get data Genre
    fetchDataGenre = async (params) => {
    this.setState({isLoading: true})
    const url = `${REACT_APP_URL}genres`
    const results = await axios.get(url)
    const {data} = results.data
    this.setState({dataGenre: data, isLoading: false})
    }

    // get data Author
    fetchDataAuthor = async (params) => {
    this.setState({isLoading: true})
    const url = `${REACT_APP_URL}authors`
    const results = await axios.get(url)
    const {data} = results.data
    this.setState({dataAuthor: data, isLoading: false})
    }

    // mount get data
    componentDidMount(){
        this.fetchDataGenre()
        this.fetchDataAuthor()
    }
       
    render(){
        {console.log(this.props)}
        return(
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Book
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control name="bookid" readOnly defaultValue={this.props.bookid} onChange={(e) => this.handleChange(e)} type="text" placeholder="Book ID" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name Book</Form.Label>
                    <Form.Control name="title" defaultValue={this.props.booktitle} onChange={(e) => this.handleChange(e)} type="text" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" defaultValue={this.props.bookdesc} onChange={(e) => this.handleChange(e)} type="text" placeholder="Description" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' name='image' className='mb-2' onChange={(e) => this.setState({image: e.target.files[0]})}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Genre</Form.Label>
                    <Form.Control as="select" name="genreid" defaultValue={this.props.genreid} onChange={(e) => this.handleChange(e)}>
                        <option>{this.props.bookgenre}</option>
                        {this.state.dataGenre.map((genre, index) => (  
                             <option value={genre.id} key={genre.id.toString()}>{genre.name}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                    <Form.Control as="select" name="authorid" defaultValue={this.props.authorid} onChange={(e) => this.handleChange(e)}>
                        <option>{this.props.bookauthor}</option>
                        {this.state.dataAuthor.map((author, index) => (  
                             <option value={author.id} key={author.id.toString()}>NomorID: {author.id} Name: {author.name}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control name="releasedate" onChange={(e) => this.handleChange(e)} type="date" placeholder="Release Date" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="statusid" defaultValue={this.props.statusid} name="statusid" onChange={(e) => this.handleChange(e)} custom>
                        <option>{this.props.bookstatus}</option>
                    <option value="1">Available</option>
                    <option value="2">Unvailable</option>
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
