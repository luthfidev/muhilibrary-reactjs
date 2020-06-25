import qs from 'querystring'
import http from '../../helpers/http'
const { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const getauthors = () => {
    return {
        type: 'AUTHORS',
        payload: http().get(url.concat('authors'))
    }
}

export const postauthors = (data) => {
    return {
        type: 'POST_AUTHORS',
        payload: http().post(url.concat('authors'), data)
    }
}

export const deleteauthors = (id) =>{
    return {
      type: 'DELETE_AUTHORS',
      payload: http().delete(url.concat(`authors/${id}`))
    }
}
    