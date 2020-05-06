import {
    SET_ALERTS,
    GET_ERRORS,
    SET_PRESETS,
} from "./types";
import axios from "axios";
const moment = require('moment');

export const getAlerts =()=> (dispatch) =>{

    axios.post("/api/alerts/get-detail")
        .then(res=>{
            console.log(res)
            console.log(Date(res.data[0].due))
            const formattedData=res.data.map(aler=>{
                const id =aler.model === "animal"?"-":aler.tag
                return{
                    id:id,
                    name:aler.linkedTo.name,
                    alertDesc:aler.name,
                    due:moment(aler.due).format('dddd, Do MMMM YYYY'),
                    unit:aler.durationType,
                    model:aler.linkedTo,

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