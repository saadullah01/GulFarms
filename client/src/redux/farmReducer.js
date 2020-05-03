import {
    SET_FARMS,
    SET_DETAIL_FARM,
    SET_FARM
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
                    ...state.farms.slice(parseInt(action.id)+1,)
                ]
            }
        case SET_FARM:
            return{
                ...state,
                farms:[
                    ...state.farms,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default farmReducer