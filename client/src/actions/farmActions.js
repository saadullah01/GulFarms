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
            console.log(res)
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

    const dbId = state.farmReducer.farms[data].id
    axios
        .post("/api/farms/view-farm", { id: dbId })
        .then(res => {
            console.log(res)
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
    const alerts = data.alerts
    console.log(-2,data)
    axios
        .post("/api/farms/create", farm)
        .then(res => {
            console.log(res)
            // dispatch({
            //     type:SET_FARM,
            //     payload:res.farm
            // })
        })
        .catch(err=>{
            console.log(err.response)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })  
}