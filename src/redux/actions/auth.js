import qs from 'querystring'
import http from '../../helpers/http'
const  {REACT_APP_URL } = process.env

export const login = (email, password) => {
    return {
        type: 'LOGIN',
        payload: http().post(`${REACT_APP_URL}auth/`, qs.stringify({email, password}))
    }
}