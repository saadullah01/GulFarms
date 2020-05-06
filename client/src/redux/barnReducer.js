import {
    SET_BARN,
    SET_BARNS,
    SET_DETAIL_BARN
} from "../actions/types";
const initialState = {
    key: [],
    barns: []
}
const barnReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETAIL_BARN:
            return {
                ...state,
                barns: [
                    ...state.barns.slice(0, action.id),
                    action.payload,
                    ...state.barns.slice(parseInt(action.id) + 1)
                ]
            }
        case SET_BARNS:
            return {
                barns: action.payload
            }
        case SET_BARN:
            return {
                ...state,
                barns: [
                    ...state.barns,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default barnReducer