const initialState = {
    dataBooks: [],
    dataBookLimit: [],
    isLoading: false,
    isError: false,
    errorMsg: '',
    token: null
}


export const books = (state=initialState, action) => {
    switch(action.type) {
        case 'BOOKS_LIMIT_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'BOOKS_LIMIT_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'BOOKS_LIMIT_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataBookLimit: action.payload.data.data,
            }
        }
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
         // UPDATE
         case 'UPDATE_BOOKS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'UPDATE_BOOKS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'UPDATE_BOOKS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
        // DELETE
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
            }
        }
        case 'DELETE_BOOKS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
        // DETAIL
        case 'DETAIL_BOOKS_PENDING': {
        return {
            ...state,
            isLoading: true,
            isError: false
            }
        }
        case 'DETAIL_BOOKS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'DETAIL_BOOKS_FULFILLED': {
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

export default (books)