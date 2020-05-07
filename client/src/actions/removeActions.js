import {SET_REMOVED,GET_ERRORS,SET_REMOVES} from "./types"
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
        case "Animal Preset":{
            axios.post("/api/remove/animal-preset",data)
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

export const getDeleted = () => (dispatch) => {
    axios
        .post("/api/remove/get")
        .then(res => {
            console.log("got ",res.data)
            dispatch({
                type: SET_REMOVES,
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
export const undoDelete = (i)=>(dispatch,getState)=>{
    const state = getState()
    const item = state.removeReducer.removed[i]
    const data={
        removalComment: "123",
        reason: "hg",
        id:item._id,
        removed:0
    }
    switch(item.removedModel){
        case "farm":{
            axios.post("/api/remove/farm",data)
                .then(res=>{
                    getDeleted()
                })
                .catch(err => {
                    // console.log(err.response)
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                })
        }
        case "barn":{
            axios.post("/api/remove/barn",data)
                .then(res=>{
                    getDeleted()
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
