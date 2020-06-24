import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore } from 'redux-persist'

import rootReducer from './reducers'


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        promiseMiddleware,
        logger
    )
)


export const persistor = persistStore(store)
export default { store }