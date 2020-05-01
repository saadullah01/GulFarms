import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_LOGGED
} from "../actions/types";

const isEmpty = require("is-empty");
const initialState = {
    islogged: false,
    laoding: false,
    user: {}
}
// export const login =(username,password)=>{
//     dispatch =>{
//     }
// }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log("1",state)
            return {
                ...state,
                islogged: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            console.log("2",state)
            return {
                ...state,
                loading: true
            };
        case SET_LOGGED:
            console.log("3",state)
            return {
                ...state,
                islogged: action.payload
            };
        default:
            console.log("4",state)
            return {...state};
    }
}

export default userReducer