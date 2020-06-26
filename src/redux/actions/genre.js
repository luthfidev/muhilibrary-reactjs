import qs from 'querystring'
import http from '../../helpers/http'
const { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const getgenres = () => {
    return {
        type: 'GENRES',
        payload: http().get(url.concat('genres'))
    }
}

export const postgenres = (data) => {
    return {
        type: 'POST_GENRES',
        payload: http().post(url.concat('genres'), data)
    }
}

export const deletegenres = (id) =>{
    return {
      type: 'DELETE_GENRES',
      payload: http().delete(url.concat(`genres/${id}`))
    }
}
    