import {
    SET_PRESET
} from "./types";
import axios from "axios";

export const getPresets = () => (dispatch) => {
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