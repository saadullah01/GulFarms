import {
    SET_REMOVED
} from "../actions/types";

const initialState = {
    key:[],
    removed:  []
}
const removeReducer = (state = initialState, action) => {
    switch (action.type) {
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