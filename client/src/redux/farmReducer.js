const initialState = {
    farms: [
        {'id': 1, 'name': "Farm 1"},
        {'id': 2, 'name': "Farm 2"}
    ]
}
const farmReducer = (state=initialState,action)=>{
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

export default farmReducer