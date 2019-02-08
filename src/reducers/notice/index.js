//import createStore from "antd/lib/table/createStore";
import actionType from '../../actions/actionType'
const initialState={
    n:10
}

export default ((state=initialState,action)=>{
    switch(action.type){
        case actionType.JIA:
        return{
            ...state,
            n:state.n+1
        }
        default:
        return state
    }
    
})