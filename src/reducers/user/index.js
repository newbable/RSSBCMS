import actionType from "../../actions/actionType";

const initState={
    id:'',
    displayName:'张三',
    token:'',
    avatar:'',
    isLogin:false
}
const userxinxi=JSON.parse(window.sessionStorage.getItem('userMsg')) || initState
export default (state=userxinxi,action)=>{
    let newState=state
    switch(action.type){
        case actionType.LOGIN_SUCCESS:
        // console.log(action)
        newState= {
            ...state,
            ...action.payload,
            isLogin:true
        }
        break;
        case actionType.LOGOUT:
        newState= {
            ...state,
            id:'',
            displayName:'',
            token:'',
            avatar:'',
            isLogin:false
        }
        break;
        default:
        break;
    }
    window.sessionStorage.setItem('userMsg',JSON.stringify(newState))
    return newState
}