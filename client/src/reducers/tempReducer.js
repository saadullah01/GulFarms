const tempReducer = (state,action)=>{
    switch(action.type){
        case '1':
            return {
                ...state,
                one:1
            }
        default:
            return state
    }
}
export default tempReducer