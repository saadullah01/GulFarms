import {
    SET_PRESETS,
    SET_PRESET,
    GET_ERRORS
} from "./types";
import axios from "axios";

export const getPresets = () => (dispatch,data) => {
    axios
        .post("/api/farms/get",data)
        .then(res => {
            console.log(res)
            dispatch({
                type: SET_PRESETS,
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
export const savePreset=()=>(dispatch,data)=>{
    console.log(data)
}