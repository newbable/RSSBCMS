import actionType from "../../actions/actionType";

const initState={
    id:'',
    displayName:'张三',
    token:'',
    avatar:'',
    isLogin:false
}
export default (state=initState,action)=>{
    switch(action.type){
        case actionType.LOGIN_SUCCESS:
        // console.log(action)
        return {
            ...state,
            ...action.payload,
            isLogin:true
        }
        case actionType.LOGOUT:
        return {
            ...state,
            id:'',
            displayName:'',
            token:'',
            avatar:'',
            isLogin:false
        }
        default:
        return state
    }
}