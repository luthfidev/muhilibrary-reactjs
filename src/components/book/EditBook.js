import React, {Component} from 'react'
import {Modal, 
        Button, 
        Form} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

import { login } from '../../redux/actions/auth'
import { updatebooks } from '../../redux/actions/book'
import { getgenres } from '../../redux/actions/genre'
import { getauthors } from '../../redux/actions/author'

class EditBook extends Component {
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
            dataGenres:[],
            dataAuthors:[],
            alert: '',

        }
    }

    // mount get data
    componentDidMount(){
        this.fetchDataGenre()
        this.fetchDataAuthor()
    }

    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }

    handlePost = (event) => {
        event.preventDefault()
        const { token } = this.props.auth
        const bookid = this.props.bookid
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.set('title', this.state.title || this.props.booktitle)
        formData.set('description', this.state.description || this.props.bookdesc)
        formData.set('genreid', this.state.genreid || this.props.bookgenreid)
        formData.set('authorid', this.state.authorid || this.props.bookauthorid)
        formData.set('releasedate', this.state.releasedate || this.props.bookrelease)
        formData.set('statusid', this.state.statusid || this.props.statusid)

        this.props.updatebooks(token, bookid, formData)
        
        this.props.history.push('/book')
    }
 
    // get data Genre
    fetchDataGenre = async () => {
        await this.props.getgenres()
        const { dataGenres } = this.props.genres
        this.setState({dataGenres})
    }

    // get data Author
    fetchDataAuthor = async (params) => {
       await this.props.getauthors()
        const { dataAuthors } = this.props.authors
        this.setState({dataAuthors})
    }
       
    render(){
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
                        {this.state.dataGenres.map((genre, index) => (  
                             <option value={genre.id} key={genre.id.toString()}>{genre.name}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                    <Form.Control as="select" name="authorid" defaultValue={this.props.authorid} onChange={(e) => this.handleChange(e)}>
                        <option>{this.props.bookauthor}</option>
                        {this.state.dataAuthors.map((author, index) => (  
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
                    <Form.Control as="select" name="statusid" defaultValue={this.props.statusid} onChange={(e) => this.handleChange(e)} custom>
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
const mapStateToProps = (state) => ({
    auth: state.auth,
    books: state.books,
    authors: state.authors,
    genres: state.genres,
  })
  const mapDispatchToProps = {
    login,
    updatebooks,
    getauthors,
    getgenres,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditBook))