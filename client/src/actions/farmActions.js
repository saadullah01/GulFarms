import {
    GET_ERRORS,
    SET_FARMS,
    SET_DETAIL_FARM,
} from "./types";
import axios from "axios";

export const getFarms =()=>(dispatch)=>{
    axios
        .post("/api/farms/get")
        .then(res=>{
            console.log(res)
            dispatch({
                type: SET_FARMS,
                payload: res.data
            }) 
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const getFarmDetail =(data)=>(dispatch,getState)=>{
    const state = getState()
    
    const dbid = state.farmReducer.farms[data]
    axios
        .post("/api/farms/view-farm",{id:dbid})
        .then(res=>{
            console.log(res)
            dispatch({
                type: SET_DETAIL_FARM,
                payload: res.data,
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