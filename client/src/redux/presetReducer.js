import {
    SET_PRESET,
    SET_PRESETS
} from "../actions/types";

const initialState = {
    key:[],
    presets:  []
}
const presetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRESETS:
            return {
                ...state,
                presets:action.payload
            }
        case SET_PRESET:
            return{
                ...state,
                presets:[
                    ...state.presets,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default presetReducer