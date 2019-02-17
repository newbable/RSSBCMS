const initState={
    username:'newbable',
    nation:'汉',
    nativePlace:'四川成都',
    email:'123456789@qq.com',
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