import qs from 'querystring'
import http from '../../helpers/http'
const  { REACT_APP_URL } = process.env

export const getbooks = () => {
    return {
        type: 'BOOKS',
        payload: http().get(`${REACT_APP_URL}books`)
    }
}