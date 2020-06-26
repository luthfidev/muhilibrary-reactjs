import http from '../../helpers/http'
const  { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const gettransactions = () => {
    return {
        type: 'TRANSACTIONS',
        payload: http().get(url.concat('transactions'))
    }
}

export const borrow = (token, data) => {
    return {
        type: 'POST_BORROW',
        payload: http(token).post(url.concat('transactions/user'), data)
    }
}