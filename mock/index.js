//服务器搭建
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
// app.get('/test',(req,res)=>{
//     res.json({
//         name:'newbable'
//     })
// })
app.listen(4995,()=>{
    console.log('正在监听4995端口')
})