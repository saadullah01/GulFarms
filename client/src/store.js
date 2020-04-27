import redux, { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from "redux-thunk"
import rootReducer from "./redux/index.js"
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

store.subscribe(() => {
    console.log(store.getState())
})


export default store