import http from '../../helpers/http'
const { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const getusers = () => {
    return {
        type: 'USERS',
        payload: http().get(url.concat('users'))
    }
}

export const userhistory = (token, param) => {
    return {
        type: 'HISTORY_USERS',
        payload: http(token).get(url.concat(`transactions/userstatus?${param}`))
    }
}

export const getusersid = (token, id) => {
    return {
        type: 'DETAIL_USERS',
        payload: http(token).get(url.concat(`users/${id}`))
    }
}

export const updateusersprofile = (token, data) => {
    return {
        type: 'UPDATE_USERS_PROFILE',
        payload: http(token).patch(url.concat('users/biodata'), data)
    }
}

