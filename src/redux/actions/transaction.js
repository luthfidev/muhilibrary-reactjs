import http from '../../helpers/http'
const { REACT_APP_URL } = process.env

export const gettransactions = () => {
    return {
        type: 'TRANSACTIONS',
        payload: http().get(`${REACT_APP_URL}transactions`)
    }
}