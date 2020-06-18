const initialState = {
    books: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_BOOKS':
            return {
                ...state,
                books: action.payload.data
            }
            default: {
                return state
            }
    }
}