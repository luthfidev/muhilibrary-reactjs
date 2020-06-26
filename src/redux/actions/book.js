import qs from 'querystring'
import http from '../../helpers/http'
const  { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const getbooks = () => {
    return {
        type: 'BOOKS',
        payload: http().get(url.concat('books'))
    }
}

export const postbooks = (data) => {
    return {
        type: 'POST_BOOKS',
        payload: http().post(url.concat('books'), data)
    }
}

export const deletebooks = (id) =>{
    return {
      type: 'DELETE_BOOKS',
      payload: http().delete(url.concat(`books/${id}`))
    }
}
    