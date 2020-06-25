import http from '../../helpers/http'
const { REACT_APP_URL } = process.env

export const getgenres = () => {
    return {
        type: 'GENRES',
        payload: http().get(`${REACT_APP_URL}genres`)
    }
}