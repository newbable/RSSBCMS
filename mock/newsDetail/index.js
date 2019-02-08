const {Router} =require('express')
const router=new Router()
const Mock=require('mockjs')

const newsDetail=()=>{
    return Mock.mock({
        'code':200,
        'news':"@cparagraph(30,70)"
    })
}
router.post('/api/v1/newsDetail',(req,res)=>{
    res.json(newsDetail())
})
module.exports=router