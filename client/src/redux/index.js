import { combineReducers } from 'redux'
import tempReducer from "./tempReducer"
import farmReducer from "./farmReducer"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"



const rootReducer = combineReducers({
    tempReducer,
    farmReducer,
    authReducer,
    errorReducer,
})



export default rootReducer