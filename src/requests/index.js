import axios from 'axios'
const isDev=process.env.NODE_ENV==='development'
const ajax=axios.create({
     //baseURL:isDev ?'http://192.168.0.104:4545':''
     baseURL: isDev ? 'http://127.0.0.1:4545' : ''
    }
)

//在办案件列表
export const fatchCaseList=(params)=>{
    return ajax.post('/api/caselist',params)
}
ajax.interceptors.request.use((config) => {
    const { token: authToken } = JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
    config.data = {
      ...config.data,
      authToken
    }
    return config
  })
//统计页面分析部分数据
  export const tongjiParag=()=>{
      return ajax.get('/api/v1/tongji')
  }
  //查询页面的数据
  export const queryList=(params)=>{
    return ajax.post('/api/v1/query',params)
}

//登录异步请求
export const userLogin=(data)=>{
    return ajax.post('/api/userlogin',data)
}
//首页轮播图
export const homePlay=()=>{
  return ajax.post('/api/v1/playImg')
}
//新闻详情
export const newsDetail=()=>{
  return ajax.post('/api/v1/newsDetail')
}
//案件录入
export const caseIn=(data)=>{
  return ajax.post('/api/v1/casein',data)
}
export const dismantleList=(data)=>{
  return ajax.post('/api/v1/dismantlelist',data)
}
export const editData=(id)=>{
  return ajax.post(`/api/articleEdit/${id}`)
}
export const saveData=(data)=>{
  return ajax.post(`/api/saveArticle`,data)
}