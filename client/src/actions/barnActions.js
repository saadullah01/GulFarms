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
        name:data.barn.barnName,
        description:data.barn.description,
        alerts:[],
        animals:[],
        id:data.id
    }
    axios.post("/api/barns/create", barn)
        .then(res => {
            
            console.log("RESPONSE AXIOS POST CREATE BARN",res.data)
            const alertsPacket = data.alerts.map((alert) => {
                return {
                    ...alert,
                    linkedTo: res.data.created._id
                }
            })
            axios.post("/api/alerts/create", { alerts: alertsPacket })
                .then(
                    dispatch({
                        type: SET_BARN,
                        payload: res.data.created
                    }))
                .catch(err => {
                    // console.log(err.response)
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                })

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