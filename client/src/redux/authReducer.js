import axios from "axios"


const initialState = {
    islogged:false,
    sessionid
}
const farmReducer = (state=initialState,action)=>{
    switch(action.type){
        case '1':
            return {
                ...state,
                one:1
            }
        default:
            return state
    }
}

export default farmReducer