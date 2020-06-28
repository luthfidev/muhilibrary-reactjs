import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Table, 
  Card, 
  Pagination,
  Dropdown, 
} from 'react-bootstrap';
import qs from 'querystring'
import Swal from 'sweetalert2'
import jwt from 'jsonwebtoken'

import TopNavbar from '../navbar'
import Sidebar from '../sidebar'
import Spiner from '../../components/Loader'

// file form modal Add
import AddGenre from '../../components/genre/AddGenre'
// file form modal edit
import EditGenre from '../../components/genre/EditGenre'

import { connect } from 'react-redux'
import { getgenres, deletegenres, } from '../../redux/actions/genre'

class Genre extends Component {
    constructor(props){
        super(props)
        this.state = {
          user: jwt.decode(this.props.auth.token) || {
            email: '',
            role: '',
          },
          dataGenres: [],
          data: [],
          pageInfo: [],
          isLoading: true,
          addModalShow : false,
          alert: null
        }
      
      }

      componentWillMount() {
        if (!this.props.auth.token) {
            this.props.history.push('/')       
        } else {
            this.fetchData()
        }  
      }  

      fetchData = async (params) => {
        const param = `${qs.stringify(params)}`
        await this.props.getgenres(param)
        const { dataGenres, pageInfo, isLoading } = this.props.genres
        this.setState({dataGenres, pageInfo, isLoading})
        if (params) {
          this.props.history.push(`?${param}`)
        }
      }

      deleteGenre = async(id) => {
        const { token } = this.props.auth
        this.props.deletegenres(token, id)
        this.fetchData()
      }
   
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
            this.deleteGenre(id)
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
          }
        })
      }

    render(){
         // pagination
        const params = qs.parse(this.props.location.search.slice(1))
        params.page = params.page || 1

        const {genreid, genrename} = this.state

         // set state addModal
        let addModalClose = () => this.setState({addModalShow:false})

        // set edit editModal close
        let editModalClose = () => this.setState({editModalShow:false})
        return(
            <>
                <Row className="no-gutters w-100 h-100">
                {this.state.isLoading &&
                  <Spiner/>
                  }
                   {!this.state.isLoading  &&( 
                    <div className="d-flex flex-row w-100">
                        <Sidebar {...this.props}/>           
                            <div className="w-100 d-flex flex-column">
                                <div className="top-navbar sticky-top">
                                    <TopNavbar search={(query) => this.fetchData(query)}/>
                                </div>
                               <Container fluid className="mt-4">
                               <Card>
                                <Card.Header>Genre</Card.Header>
                                <Card.Body>
                                <div className="d-flex flex-row">
                                <div className="action-btn mr-2">
                                <button onClick={()=> this.setState({addModalShow: true})} className="btn btn-success mb-2">Add</button>
                                  </div>
                                    <AddGenre
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        refreshdata={() => this.fetchData()}
                                    />
                                    <Dropdown className="mb-4">
                                              <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                  Limit
                                              </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, limit: '10' })}>10</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, limit: '50' })}>50</Dropdown.Item>
                                                      <Dropdown.Item  onClick={() => this.fetchData({ ...params, limit: '100' })}>100</Dropdown.Item>
                                                  </Dropdown.Menu>
                                          </Dropdown>
                                          <Dropdown className="ml-2">
                                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                                            Sort
                                        </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 0 })}>A-z</Dropdown.Item>
                                                <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 1 })}>Z-a</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                     </div>
                                     <EditGenre
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        refreshdata={() => this.fetchData()}
                                        genreid = {genreid}
                                        genrename = {genrename}
                                         />
                                    <Table striped bordered hover>
                                    <thead align="center">
                                        <tr>
                                        <th>No</th>
                                        <th>Name Genre</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    {this.state.dataGenres.length !== 0 &&(
                                    <tbody align="center">
                                         {this.state.dataGenres.map((genre, index) => (  
                                        <tr key={genre.id.toString()}>
                                        <td>{index + 1}</td>
                                        <td>{genre.name}</td>                                
                                        <td align="center">
                                        <button  onClick={() =>  {  this.setState({editModalShow: true, 
                                                                                    genreid: genre.id, 
                                                                                    genrename: genre.name, 
                                                                                    })} } className="btn btn-warning ml-2">Edit</button>                  
                                       <button onClick={() =>  {  this.onConfirmDelete(genre.id)} } className="btn btn-danger ml-2">Delete</button> 
                                        </td> 
                                        {this.state.alert}                                    
                                        </tr>   
                                         ))}                           
                                    </tbody>
                                    )}
                                    {this.state.dataGenres.length===0 &&(
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
                  )}       
                </Row>
            </>
        )
    };
}

// export default Genre
const mapStateToProps = (state) => ({
  auth: state.auth,
  genres: state.genres
})
const mapDisPatchProps = {
  getgenres,
  deletegenres,
}

export default connect(mapStateToProps, mapDisPatchProps)(Genre)