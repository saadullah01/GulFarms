import {
    SET_BARNS,
    SET_PRESET,
    GET_ERRORS,
    SET_DETAIL_PRESET

} from "./types";
import axios from "axios";

export const getPresets = (data) => (dispatch) => {
    console.log(data)
    // axios
    //     .post("/api/farms/get", data)
    //     .then(res => {
    //         console.log(res)
    //         dispatch({
    //             type: SET_PRESETS,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: err.response.data
    //         })

    //     })
}
const attributeTypes = {
    "Numeric": "number",
    "Options": "option",
    "String": "string"
}
export const getPresetDetail=(data)=>(dispatch,getState)=>{
    const state = getState()
    const dbId = state.presetReducer.presets[parseInt(data)]._id
    axios
        .post("/api/animals/view-preset", { id: dbId })
        .then(res => {
            dispatch({
                type: SET_DETAIL_PRESET,
                payload: res.data,
                id: data
            })
            dispatch({
                type: SET_BARNS,
                payload:res.data.barns
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

}
export const savePreset = (data) => (dispatch, getState) => {

    const preset = {}
    const state = getState()
    const farm = state.farmReducer.farms[data.farmId]
    preset.name = data.AnimalName
    preset.trackOffspring = data.recordOffspring
    preset.linkParents = data.recordParents
    preset.barns = []
    preset.farmId = farm._id
    preset.attributes = !data.attributes.length ? [] : data.attributes.map(attribute => {
        const att = {
            name: attribute.Name,
            attributeType: attributeTypes[attribute.Type],
            keepTrack: attribute.checked
        }
        if (attribute.Unit.length) {
            att.unit = attribute.Unit
        }
        if (attribute.Option.length) {
            att.options = attribute.Option
        }
        return att
    })
    preset.products = !data.alerts.length ? [] : data.alerts.map(product => {
        const att = {
            name: product.description,
            duration: product.duration,
            durationType: product.selectedOption
        }
        return att
    })
    console.log(preset)
    axios.post("/api/animals/create-preset", preset)
        .then(res => {
            const updatedPresets = [
                ...farm.animalPresets,
                res.data.id

            ]
            // console.log("lololo",updatedFarm)
            dispatch({
                type: SET_PRESET,
                payload: { id: res.data.id, name: res.data.name }
            })

            // dispatch({
            //     type:SET_DETAIL_FARM,
            //     payload:{
            //         ...farm,
            //         animalPresets:updatedPresets
            //     },
            //     id:res.data.id
            // })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}