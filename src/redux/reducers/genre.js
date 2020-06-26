const initialState = {
    dataGenres: [],
    isLoading: false,
    isError: false,
    errorMsg: '',
    token: null
}

const genres = (state=initialState, action) => {
    switch(action.type) {
        case 'GENRES_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'GENRES_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message
            }
        }
        case 'GENRES_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataGenres: action.payload.data.data
            }
        }
         // POST
         case 'POST_GENRES_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'POST_GENRES_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'POST_GENRES_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
         // UPDATE
         case 'UPDATE_GENRES_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'UPDATE_GENRES_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'UPDATE_GENRES_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
           // delete
        case 'DELETE_GENRES_PENDING': {
        return {
            ...state,
            isLoading: true,
            isError: false
            }
        }
        case 'DELETE_GENRES_REJECTED': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'DELETE_GENRES_FULFILLED': {
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
export default genres