const initialState = {
    dataTransactions: [],
    isLoading: false,
    isError: false,
    errorMsg: '',
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
                dataTransactions: action.payload.data.data
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