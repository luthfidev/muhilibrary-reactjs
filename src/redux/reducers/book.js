const initialState = {
    dataBooks: [{}],
    isLoading: false,
    isError: false,
    errorMsg: '',
    token: null
}


const books = (state=initialState, action) => {
    switch(action.type) {
        case 'BOOKS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'BOOKS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'BOOKS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataBooks: action.payload.data.data,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
export default books