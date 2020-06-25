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
        default: {
            return {
                ...state
            }
        }
    }
}
export default genres