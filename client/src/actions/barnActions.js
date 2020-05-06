import axios from "axios";
import {
    SET_BARN,
    GET_ERRORS
} from "./types"
export const saveBarn = (data) => (dispatch, getState) => {

    const state = getState()
    const farm = state.farmReducer.farms[data.farmId]
    const preset = state.presetReducer.presets[data.presetId]
    const barn = {
        barn:data
    }
    axios.post("/api/animals/create-barn", barn)
        .then(res => {
            const updatedPresets = [
                ...farm.animalPresets,
                res.data.id

            ]
            // console.log("lololo",updatedFarm)
            dispatch({
                type: SET_BARN,
                payload: { id: res.data.id, name: res.data.name }
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}