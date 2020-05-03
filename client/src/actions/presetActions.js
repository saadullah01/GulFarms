import {
    SET_PRESETS,
    SET_PRESET
} from "./types";
import axios from "axios";

export const getPresets = () => (dispatch,data) => {
    axios
        .post("/api/farms/get",data)
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