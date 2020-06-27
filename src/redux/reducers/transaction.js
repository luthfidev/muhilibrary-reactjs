const initialState = {
    dataTransactions: [],
    pageInfo: [],
    successMsg: '',
    isLoading: false,
    isError: false,
    errorMsg: '',
    token: null
}

const transactions = (state=initialState, action) => {
    switch(action.type) {
        case 'TRANSACTIONS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'TRANSACTIONS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message
            }
        }
        case 'TRANSACTIONS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataTransactions: action.payload.data.data,
                pageInfo: action.payload.data.pageInfo,
            }
        }
         // POST transaction
         case 'POST_TRANSACTIONS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case 'POST_TRANSACTIONS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'POST_TRANSACTIONS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                successMsg: action.payload.data.message,
            }
        }
         // UPDATE transaction
         case 'UPDATE_TRANSACTIONS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case 'UPDATE_TRANSACTIONS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'UPDATE_TRANSACTIONS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                successMsg: action.payload.data.message,
            }
        }
         // DELETE transaction
         case 'DELETE_TRANSACTIONS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case 'DELETE_TRANSACTIONS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'DELETE_TRANSACTIONS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                successMsg: action.payload.data.message,
            }
        }
         // POST Borrow
         case 'POST_BORROW_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case 'POST_BORROW_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'POST_BORROW_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                successMsg: action.payload.data.message,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default transactions