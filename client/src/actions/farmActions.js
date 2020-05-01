import {
    GET_ERRORS,
    SET_FARMS
} from "./types";
import axios from "axios";

export const getFarms =()=>dispatch=>{
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
