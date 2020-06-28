const initialState = {
    dataUsers: [],
    dataHistoryUsers: [],
    isLoading: false,
    successMsg: '',
    isError: false,
    errorMsg: '',
    token: null
}


export const books = (state=initialState, action) => {
    switch(action.type) {
        case 'USERS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'USERS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'USERS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataUsers: action.payload.data.data,
            }
        }
        // DETAIL
        case 'DETAIL_USERS_PENDING': {
        return {
            ...state,
            isLoading: true,
            isError: false
            }
        }
        case 'DETAIL_USERS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'DETAIL_USERS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataUsers: action.payload.data.data,
            }
        }
        // HISTORY USERS
        case 'HISTORY_USERS_PENDING': {
        return {
            ...state,
            isLoading: true,
            isError: false
            }
        }
        case 'HISTORY_USERS_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'HISTORY_USERS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataHistoryUsers: action.payload.data.data,
                pageInfo: action.payload.data.pageInfo,
            }
        }
        // UPDATE USERS PROFI;E
        case 'UPDATE_USERS_PROFILE_PENDING': {
        return {
            ...state,
            isLoading: true,
            isError: false
            }
        }
        case 'UPDATE_USERS_PROFILE_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'UPDATE_USERS_PROFILE_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataUsers: action.payload.data.data,
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

export default (books)