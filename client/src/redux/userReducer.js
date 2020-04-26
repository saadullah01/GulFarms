import axios from "axios"


const initialState = {
    islogged:false,
    sessionid:"",
}
// export const login =(username,password)=>{
//     dispatch =>{
//     }
// }

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                one:1
            }
        default:
            return state
    }
}

export default userReducer