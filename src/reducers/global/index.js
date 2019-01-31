import actionType from '../../actions/actionType'
const initState={
    isLoding:false
}
export default (state=initState,action)=>{
    switch(action.type){
        case actionType.G_REQUEST_START:
        return {
            isLoding:true
        }
        case actionType.G_REQUEST_COMPLETED:
        return {
            isLoding:false
        }
        default:
        return state
    }
}