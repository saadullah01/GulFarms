import redux, { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import tempReducer from "./tempReducer"
import farmReducer from "./farmReducer"
import authReducer from "./authReducer"
import thunk from "redux-thunk"
import errorReducer from "./errorReducer"



const rootReducer = combineReducers({
    tempReducer,
    farmReducer,
    authReducer,
    errorReducer,
})

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: 'MyApp', actionsBlacklist: ['REDUX_STORAGE_SAVE']
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)
const store = createStore(
    rootReducer,
    {},
    enhancer
)

export default store