import React, { Component } from 'react'
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap'
import Swal from 'sweetalert2' 
import qs from 'querystring'
import axios from 'axios'
const {REACT_APP_URL} = process.env


export class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            image: '',
            genreid: '',
            authorid: '',
            releasedate: '',
            statusid: '',
            alert: '',
            data:[],
            percentage: 0
        }
        this.handlePost = this.handlePost.bind(this)
    }
    

      // get data 
      fetchDataGenre = async (params) => {
        this.setState({isLoading: true})
        const url = `${REACT_APP_URL}genres`
        const results = await axios.get(url)
        const {data} = results.data
        this.setState({data, isLoading: false})
     }

  // mount get data
  async componentDidMount(){
      await this.fetchDataGenre()
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
       
        const options = {
            onUploadProgress: (event) => {
                const {loaded, total} = event
                let percent = Math.floor( (loaded * 100) / total)
                console.log(percent)

                if (percent < 100){
                   this.setState({ uploadPercentage: percent })
                }
            }
        }

        const url = `${REACT_APP_URL}books`
        await axios.post(url, formData, options).then( (response) => {
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
          this.props.onHide() 
        //    this.props.refreshdata() 
    }
  
    render(){
        const {uploadPercentage} = this.state
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
                    <Form.Control name="title" onChange={(e) => this.handleChange(e)} type="text" placeholder="Title" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" onChange={(e) => this.handleChange(e)} type="text" placeholder="Description" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' name='image' className='mb-2' onChange={(e) => this.setState({image: e.target.files[0]})}/>
                    { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} label={uploadPercentage}/>}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Genre</Form.Label>
                    <Form.Control as="select" name="genreid" onChange={(e) => this.handleChange(e)}>
                        {this.state.data.map((genre, index) => (  
                             <option value={genre.id} key={genre.id.toString()}>{genre.name}</option>
                         ))}           
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Author</Form.Label>
                    <Form.Control as="select" name="authorid" onChange={(e) => this.handleChange(e)} custom>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control name="releasedate" onChange={(e) => this.handleChange(e)} type="date" placeholder="Release Date" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="statusid" name="statusid" onChange={(e) => this.handleChange(e)} custom>
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