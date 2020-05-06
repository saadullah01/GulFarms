import axios from "axios";
import {
    SET_BARN,
    GET_ERRORS,
    SET_DETAIL_BARN,
    SET_INSTANCE
} from "./types"
import { useEffect } from "react";
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
export const getBarnDetail=(data)=>(dispatch,getState)=>{
    const state=getState()
    const dbId = state.barnReducer.barns[parseInt(data)]._id
    axios
        .post("/api/barns/view",{id:dbId})
        .then(res=>{
            dispatch({
                type:SET_DETAIL_BARN,
                payload:res.data,
                id:data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const saveInstance =(data)=>(dispatch,getState)=>{
    console.log(data)
}