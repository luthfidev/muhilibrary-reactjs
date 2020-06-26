import qs from 'querystring'
import http from '../../helpers/http'
const  { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const login = (email, password) => {
    return {
        type: 'LOGIN',
        payload: http().post(url.concat('auth/'), qs.stringify({email, password}))
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
        payload: http().delete(url.concat('auth/logout'))
    }
}