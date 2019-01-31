import actionType from "../../actions/actionType";

const initState={
    displayName:'张三',
    token:'sflkseg',
    avatar:'address'
}
export default (state=initState,action)=>{
    switch(action.type){
        case actionType.LOGIN_SUCCESS:
        // console.log(action)
        return {
            ...state,
            ...action.payload
        }
        default:
        return state
    }
}