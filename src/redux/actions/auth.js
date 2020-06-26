import qs from 'querystring'
import http from '../../helpers/http'
const  { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`
const user = JSON.parse(localStorage.getItem('persist:root'));
const getToken = user.auth.token

export const login = (email, password) => {
    return {
        type: 'LOGIN',
        payload: http().post(url.concat('auth/'), qs.stringify({email, password}))
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
        payload: http(getToken).delete(url.concat('auth/logout'))
    }
}