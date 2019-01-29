import axios from 'axios'
const isDev=process.env.NODE_ENV==='development'
const ajax=axios.create({
     baseURL:isDev ?'http://192.168.0.101:4545':''
    // baseURL: isDev ? 'http://127.0.0.1:4995' : ''
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
  export const queryList=()=>{
    return ajax.get('/api/v1/query')
}