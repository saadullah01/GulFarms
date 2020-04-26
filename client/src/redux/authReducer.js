import axios from "axios"
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
            return {
                ...state,
                islogged: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_LOGGED:
            return {
                ...state,
                islogged: action.payload
            };
        default:
            return state;
    }
}

export default userReducer