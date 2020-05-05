import {
    SET_ALERTS,
    GET_ERRORS,
    SET_PRESETS,
} from "./types";
import axios from "axios";

export const getAlerts =()=> (dispatch) =>{

    axios.post("/api/alerts/get")
        .then(res=>{
            console.log(res)
            const formattedData=res.data.map(aler=>{
                return{
                    id:1,
                    name:"sheep",
                    alertDesc:aler.name,
                    due:1,
                    unit:aler.durationType
                }
            })
            console.log(formattedData);
            dispatch({
                type: SET_ALERTS,
                payload: formattedData
            })
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}