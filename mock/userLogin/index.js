const {Router}=require('express')
const Mock=require('mockjs')
const router=new Router()
const userLogin=()=>{
    return Mock.mock({
        "code":200,
        data:{
            id:'@id',
            token:'@uuid',
            displayName:'@cname',
            avatar:'@img(48x48,@color,@word)'
        }
    })
}
router
    .post('/api/userlogin',(req,res)=>{
        res.json(userLogin(req.body))
    })
module.exports=router