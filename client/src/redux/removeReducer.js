import {
    SET_REMOVED,
    SET_REMOVES
} from "../actions/types";

const initialState = {
    key:[],
    removed:  []
}
const removeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REMOVES:
            return{
                ...state,
                removed:action.payload
            }
        case SET_REMOVED:
            return {
                ...state,
                removed:[
                    ...initialState.removed,
                    action.payload
                ]
            }
        
        default:
            return state
    }
}

export default removeReducer