const initialState = {
    dataAuthors: [],
    isLoading: false,
    isError: false,
    errorMsg: '',
    token: null
}

const authors = (state=initialState, action) => {
    switch(action.type) {
        case 'AUTHORS_PENDING': {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case 'AUTHORS_REJECTED': {
            return{
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: action.payload.response.data.message,
            }
        }
        case 'AUTHORS_FULFILLED': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataAuthors: action.payload.data.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default authors