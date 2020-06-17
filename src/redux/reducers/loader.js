const initialState = {
    loading: false
}

const loader = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LOADER': {
            return { 
                ...state, 
                loading: false
            }
            break
        }
        case 'HIDE_LOADER': {
            return {
                ...state,
                loading: true
            }
            break
        }
        default: {
            return state
        }
    }
}

export default loader