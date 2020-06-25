import http from '../../helpers/http'
const { REACT_APP_URL } = process.env

export const getauthors = () => {
    return {
        type: 'AUTHORS',
        payload: http().get(`${REACT_APP_URL}authors`)
    }
}