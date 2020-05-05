import{
    SET_ALERTS
} from "../actions/types"
const initialState ={
    alerts: [
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        },
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        },
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        },
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        },
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        },
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        },
        {
            id: 1,
            duration: 1,
            name: "Sheep",
            alertDesc: "Expecting Delivery",
            due: 1,
            unit: "month"
        }
    ]
}
const alertReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_ALERTS:
            return{
                ...state,
                alerts:action.payload
            }
        default:
            return state
    }
    
}
export default alertReducer