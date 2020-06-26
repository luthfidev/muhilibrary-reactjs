import http from '../../helpers/http'
const  { REACT_APP_URL } = process.env
const url = `${REACT_APP_URL}`

export const gettransactions = () => {
    return {
        type: 'TRANSACTIONS',
        payload: http().get(url.concat('transactions'))
    }
}

export const borrow = () => {
    return {
        type: 'POST_BORROW',
        payload: http().post(url.concat('transactions/users'))
    }
}