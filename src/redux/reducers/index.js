import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import auth from './auth'
import loader from './loader'
import books from './book'
import authors from './author'
import genres from './genre'
import transactions from './transaction'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    debug: false,
    whitelist: ['auth'],
}

const rootReducer = combineReducers({
    auth,
    books,
    authors,
    genres,
    transactions,
})

// export default(rootReducer)

export default persistReducer(persistConfig, rootReducer)