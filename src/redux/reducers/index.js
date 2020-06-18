import { combineReducers } from 'redux'
import loader from './loader'
import books from './book'

export default combineReducers({
    loader,
    books
})