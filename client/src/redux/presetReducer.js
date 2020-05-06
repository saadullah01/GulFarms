import {
    SET_PRESET,
    SET_PRESETS,
    SET_DETAIL_PRESET
} from "../actions/types";

const initialState = {
    key: [],
    presets: []
}
const presetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETAIL_PRESET:
            return {
                ...state,
                presets: [
                    ...state.presets.slice(0, action.id),
                    action.payload,
                    ...state.presets.slice(parseInt(action.id) + 1)
                ]
            }
        case SET_PRESETS:
            return {
                presets: action.payload
            }
        case SET_PRESET:
            return {
                ...state,
                presets: [
                    ...state.presets,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default presetReducer