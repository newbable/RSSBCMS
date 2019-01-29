//服务器搭建
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
const caselist=require('./CaseList')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(caselist)
app.get('/test',(req,res)=>{
    res.json({
        name:'newbable'
    })
})
app.post('/test',(req,res)=>{
    console.log(req.body)
    res.json({
        name:'newbable'
    })
})
app.listen(4545,()=>{
    console.log('正在监听4545端口')
})