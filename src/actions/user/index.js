import {requestStart,requestCompleted} from '../global'
import {userLogin} from '../../requests'
import actionType from '../actionType';
export const loginSuccess=(data)=>{
    return {
        type:actionType.LOGIN_SUCCESS,
        payload:data
    }
}
export const doLogin=(userLoginInfo)=>{
    return dispatch=>{
        dispatch(requestStart())
        // setTimeout(()=>{
        //     dispatch(requestCompleted())
        // },2000)
        userLogin(userLoginInfo)
            .then((resp)=>{
                if(resp.data.code===200){
                    dispatch(loginSuccess(resp.data.data))
                }else{
                    //TODO:暂时还没想到做什么
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                dispatch(requestCompleted())
            })
    }
}
