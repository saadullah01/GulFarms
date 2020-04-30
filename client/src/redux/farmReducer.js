import {
    SET_FARMS
} from "../actions/types";
const initialState = {
    farms: [{ 'id': 1, 'name': "Farm 1" },
    { 'id': 2, 'name': "Farm 2" }]
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