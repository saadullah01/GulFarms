import {
    GET_ERRORS,
    SET_FARMS,
    SET_DETAIL_FARM,
    SET_FARM
} from "./types";
import axios from "axios";

export const getFarms = () => (dispatch) => {
    axios
        .post("/api/farms/get")
        .then(res => {
            // console.log(res)
            dispatch({
                type: SET_FARMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const getFarmDetail = (data) => (dispatch, getState) => {
    const state = getState()

    const dbId = state.farmReducer.farms[data]._id
    axios
        .post("/api/farms/view-farm", { id: dbId })
        .then(res => {
            // console.log(res)
            dispatch({
                type: SET_DETAIL_FARM,
                payload: res.data,
                id: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const saveFarm = (data) => (dispatch, getState) => {
    const farm = data.farm
    // console.log(-2, data)

    axios
        .post("/api/farms/create", farm)
        .then(res => {
            const alertsPacket = data.alerts.map((alert) => {
                return {
                    ...alert,
                    linkedTo: res.data.farm._id
                }
            })
            // console.log(res)
            // Promise.all(alertsPacket.map(alert => {
            //     axios.post("/api/alerts/create", alert)
            // }))
            axios.post("/api/alerts/create", { alerts: alertsPacket })
                .then(
                    dispatch({
                        type: SET_FARM,
                        payload: res.data.farm
                    }))
                .catch(err => {
                    // console.log(err.response)
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                })

        })
        .catch(err => {
            // console.log(err.response)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}