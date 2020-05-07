import { combineReducers } from 'redux'
import tempReducer from "./tempReducer"
import farmReducer from "./farmReducer"
import authReducer from "./authReducer"
import presetReducer from "./presetReducer"
import errorReducer from "./errorReducer"
import alertReducer from "./alertsReducer"
import barnReducer from './barnReducer'
import removeReducer from "./removeReducer"



const rootReducer = combineReducers({
    tempReducer,
    farmReducer,
    authReducer,
    errorReducer,
    presetReducer,
    alertReducer,
    barnReducer,
    removeReducer
})



export default rootReducer