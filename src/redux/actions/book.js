import axios from 'axios'
const { REACT_APP_URL } = process.env

export const getAllBooks =  () => {
    return (dispatch) => {
        axios.get(`${REACT_APP_URL}books`)
        .then(function (response) {
           dispatch({
            type: 'GET_ALL_BOOKS',
            payload: {
                data: response.data,
                errorMessage: false
            }
           })
        })
        .catch(function (error) {
            dispatch({
                type: 'GET_ALL_BOOKS',
                payload: {
                    data: false,
                    errorMessage: error.errorMessage
                }
               })
        })
    }
}