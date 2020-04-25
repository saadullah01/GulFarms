import redux,{combinedReducers,createStore,applyMiddleware} from 'redux'
import tempReducer from "./tempReducer"
import thunk from "redux-thunk"
const rootReducer =({
    temp:tempReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store