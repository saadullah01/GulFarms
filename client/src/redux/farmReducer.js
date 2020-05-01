import {
    SET_FARMS
} from "../actions/types";
const initialState = {
    farms: []
}
const farmReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FARMS:
            return {
                ...state,
                farms:action.payload
            }
        default:
            return state
    }
}

export default farmReducer