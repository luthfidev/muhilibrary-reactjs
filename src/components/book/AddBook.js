import React, { Component } from 'react'
import {Modal, 
        Button, 
        Form, 
        ProgressBar} from 'react-bootstrap'
import Swal from 'sweetalert2' 
import axios from 'axios'
import authHeader from '../../services/authHeader'

const {REACT_APP_URL} = process.env

function ValidationMessage(props) {
    if (!props.valid) {
      return(
        <div className='error-msg text-danger'>{props.message}</div>
      )
    } else {
      return(
        <div className='error-msg text-success'>Look Goods!</div>
      )
    }
  }

export class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '', titleValid: false,
            description: '', descriptionValid: false,
            image: '',
            genreid: '',
            authorid: '',
            releasedate: '',
            statusid: '',
            alert: '',
            dataGenre:[],
            dataAuthor:[],
            percentage: 0,
            formValid: false,
            errorMsg: {}

        }
        this.handlePost = this.handlePost.bind(this)
    }

    validateForm = () => {
        const {titleValid, descriptionValid} = this.state;
        this.setState({
          formValid: titleValid && descriptionValid
        })
      }

      updateTitle = (title) => {
        this.setState({title}, this.validateTitle)
      }
  
      validateTitle = () => {
        const {title} = this.state;
        let titleValid = true;
        let errorMsg = {...this.state.errorMsg}
    
        if (title.length < 3) {
          titleValid = false;
          errorMsg.title = 'Must be at least 3 characters long'
        } else if (title.length > 25) {
          titleValid = false;
          errorMsg.title = 'Too long characters'
        }
    
        this.setState({titleValid, errorMsg}, this.validateForm)
      }
  
  
      updateDescription = (description) => {
        this.setState({description}, this.validateDescription)
      }
  
      validateDescription = () => {
        const {description} = this.state;
        let descriptionValid = true;
        let errorMsg = {...this.state.errorMsg}
    
        if (description.length < 3) {
          descriptionValid = false;
          errorMsg.description = 'Must be at least 3 characters long'
        } else if (description.length > 50) {
          descriptionValid = false;
          errorMsg.description = 'Too long characters'
        }
    
        this.setState({descriptionValid, errorMsg}, this.validateForm)
      }
    
    handleChange = event => {
        this.setState({[  event.target.name]: event.target.value})
    }
        
       handlePost = async (event) => {
        event.preventDefault()
      /*   this.setState({isLoading: true}) */

        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.set('title', this.state.title)
        formData.set('description', this.state.description)
        formData.set('genreid', this.state.genreid)
        formData.set('authorid', this.state.authorid)
        formData.set('releasedate', this.state.releasedate)
        formData.set('statusid', this.state.statusid)

        const url = `${REACT_APP_URL}books`
        await axios.post(url, formData, {headers: authHeader()}).then( (response) => {
            this.setState({addMsg: "User is successfully added to the database"})
            console.log(response)
            this.setState({ uploadPercentage: 100 }, () => {
                setTimeout(()=> {
                    this.setState({ uploadPercentage: 0})
                }, 2000)
                this.setState({Msg: response.data.message})
                Swal.fire({
                    title: 'Done !',
                    text: this.state.addMsg,
                    icon: 'success',
                    timer: 2000
                  })
                  this.setState({ redirect: this.state.redirect === false });
            })
          })
          .catch(function (error) {
            Swal.fire({
                title: 'Done !',
                text: error.response.data.message,
                icon: 'warning',
                timer: 3000
              }) 
           }) 
         // this.props.onHide() 
        this.props.refreshdata() 
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

    componentWillUnmount(){
        this.fetchDataGenre()
        this.fetchDataAuthor()
    }
  
    render(){
        const {uploadPercentage, formValid} = this.state
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Book
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.handlePost}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name Book</Form.Label>
                    <Form.Control name="title" value={this.state.title} onChange={(e) => this.updateTitle(e.target.value)} type="text" placeholder="Title" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.titleValid} message={this.state.errorMsg.title} />
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={this.state.description} onChange={(e) => this.updateDescription(e.target.value)} type="text" placeholder="Description" />
                    <Form.Text className="text-muted">
                    < ValidationMessage valid={this.state.descriptionValid} message={this.state.errorMsg.description} />
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' name='image' className='mb-2' onChange={(e) => this.setState({image: e.target.files[0]})}/>
                    { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} label={uploadPercentage}/>}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Genre</Form.Label>
                    <Form.Control as="select" name="genreid" onChange={(e) => this.handleChange(e)}>
                        <option>Select Genre</option>
                        {this.state.dataGenre.map((genre, index) => (  
                             <option value={genre.id} key={genre.id.toString()}>{genre.name}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                    <Form.Control as="select" name="authorid" onChange={(e) => this.handleChange(e)}>
                        <option>Select Author</option>
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
                    <Form.Control as="select" name="statusid" onChange={(e) => this.handleChange(e)} custom>
                    <option>Select</option>
                    <option value="1">Available</option>
                    <option value="2">Unvailable</option>
                    </Form.Control>
                </Form.Group>
                <Button disabled={!formValid} variant="primary" type="submit">
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