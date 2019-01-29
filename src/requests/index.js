import axios from 'axios'
const isDev=process.env.NODE_ENV==='development'
const ajax=axios.create({
     baseURL:isDev ?'http://192.168.0.101:4545':''
    }
)

export const fatchCaseList=(params)=>{
    return ajax.post('/api/caselist',params)
}