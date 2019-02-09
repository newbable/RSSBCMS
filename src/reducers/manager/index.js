const initState={
    username:'newbable',
    nation:'汉',
    nativePlace:'四川绵阳',
    email:'1558781725@qq.com',
    address:'',
    phone:'',
    Ename:'adward',
    position:'manager'
}
const managerInfo=JSON.parse(window.localStorage.getItem('managerInfo'))||initState
export default (state=managerInfo,action)=>{
    let newState=state
    switch(action.type){
        default:
        break;
    }
    window.localStorage.setItem('managerInfo',JSON.stringify(newState))
    return newState
}