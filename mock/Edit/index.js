//将Router从express中解构出来使用
const { Router } = require('express')
const Mock=require('mockjs')
const articleList=({limited,offset})=>{
    const idStart=offset+100
    const totalCount=48
    const currentPage=offset/limited +1
    const isLastPage=currentPage>=(totalCount/limited)
    const dataCount=(isLastPage&&(totalCount%limited)!==0)?(totalCount%limited):limited
    const data=`data|${limited}`
    return Mock.mock({
        "code":200,
        // 变量作为json数据的key时，必须用中括号包起来
        [data]:[{
            "id|+1":idStart,
            "title":"@ctitle(10,20)",
            "amount":"@integer(100,1000)",
            "author":"@cname",
            "createAt":"@datetime('T')"
        }],
        totalCount,
        currentPage,
        dataCount,
        isLastPage
    })
}
const articleEdit=(id)=>{
    return Mock.mock({
        code:200,
        data:{
            id,
            'title':'@ctitle',
            'author':'拆迁',
            'createAt':"@datetime('T')",
            'content':'<p>@cparagraph </p> <img src=@img()/>'
        }
    })
}
const router = new Router()

router
    .post('/api/list',(req,resp)=>{
        console.log(req.body)
        resp.json(articleList(req.body))
    })
    .post('/api/delete/:id',(req,resp)=>{
        resp.json({
            "code":200,
            "msg":"成功删除该条信息"
        })
    })
    .post('/api/articleEdit/:id',(req,resp)=>{
        resp.json(articleEdit(req.params.id))
    })
    .post('/api/saveArticle',(req,resp)=>{
        resp.json({
            "code":200,
            "msg":'保存成功'
        })
    })
module.exports=router