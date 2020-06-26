const initialState = {
    dataBooks: [],
    isLoading: false,
    isError: false,
    errorMsg: '',
    token: null
}


export const books = (state=initialState, action) => {
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
         // POST
         case 'POST_BOOKS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'POST_BOOKS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'POST_BOOKS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
           // delete
        case 'DELETE_BOOKS_PENDING': {
        return {
            ...state,
            isLoading: true,
            isError: false
            }
        }
        case 'DELETE_BOOKS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'DELETE_BOOKS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default (books)