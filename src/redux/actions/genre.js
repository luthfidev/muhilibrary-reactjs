import http from '../../helpers/http'
const { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const getgenres = (param) => {
    return {
        type: 'GENRES',
        payload: http().get(url.concat(`genres?${param}`))
    }
}

export const postgenres = (token, data) => {
    return {
        type: 'POST_GENRES',
        payload: http(token).post(url.concat('genres'), data)
    }
}

export const updategenres = (token, id, data) => {
    return {
        type: 'UPDATE_GENRES',
        payload: http(token).patch(url.concat(`genres/${id}`), data)
    }
}

export const deletegenres = (token, id) =>{
    return {
      type: 'DELETE_GENRES',
      payload: http(token).delete(url.concat(`genres/${id}`))
    }
}
    