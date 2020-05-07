import {SET_REMOVED,GET_ERRORS} from "./types"
import axios from "axios"

export const removeItem = (data,typ)=>(dispatch,getState)=>{
    switch(typ){
        case "Farm":{
            axios.post("/api/remove/farm",data)
                .then(res=>{
                    console.log("here",res)
                    dispatch({
                        type:SET_REMOVED,
                        payload:res.payload
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
        case "Barn":{
            axios.post("/api/remove/barn",data)
                .then(res=>{
                    console.log("here",res)
                    dispatch({
                        type:SET_REMOVED,
                        payload:res.payload
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
    }
}