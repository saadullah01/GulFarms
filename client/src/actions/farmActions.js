import {
    GET_ERRORS,
    SET_FARMS
} from "./types";
import axios from "axios";

export const getFarms =()=>dispatch=>{
    axios
        .get("/api/farms/get")
        .then(res=>{
            dispatch({
                type: SET_FARMS,
                payload: res.response.data
            }) 
        })
        .catch(err=>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
