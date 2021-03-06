//服务器搭建
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
const caselist=require('./CaseList')
//统计页段落
const tongji=require('./jingjing/tongji')
//查询页数据
const query=require('./jingjing/query')
const login=require('./userLogin')
//首页轮播图
const playimg=require('./HomePlay')
//新闻详情
const news=require('./newsDetail')
// 案件录入
const casein=require('./BatchHandle')
const dismantleList=require('./DismantleCase')
const edit=require('./Edit')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(caselist)
app.use(login)
app.use(playimg)
app.use(news)
app.use(casein)
app.use(dismantleList)
app.use(edit)

app.use('/api/v1/tongji',tongji)
app.use('/api/v1/query',query)
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
