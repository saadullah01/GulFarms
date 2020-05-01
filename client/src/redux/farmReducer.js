import {
    SET_FARMS,
    SET_DETAIL_FARM
} from "../actions/types";

const initialState = {
    key:[],
    farms:  []
}
const farmReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FARMS:
            return {
                ...state,
                farms:action.payload
            }
        case SET_DETAIL_FARM:
            return{
                ...state,
                farms:[
                    ...state.farms.slice(0,action.id),
                    action.payload,
                    ...state.farms.slice(action.id+1,)
                ]
            }
        default:
            return state
    }
}

export default farmReducer