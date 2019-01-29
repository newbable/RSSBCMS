//服务器搭建
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
//统计页段落
const tongji=require('./jingjing/tongji')
const query=require('./jingjing/query')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
// app.get('/test',(req,res)=>{
//     res.json({
//         name:'newbable'
//     })
// })

app.use('/api/v1/tongji',tongji)
app.use('/api/v1/query',query)

app.listen(4995,()=>{
    console.log('正在监听4995端口')
})