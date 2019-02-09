const {Router} =require('express')
const router=new Router()

const Mock =require('mockjs')

const homeImg=()=>{
    return Mock.mock({
        'code':200,
        'imgs|5':[
            '@img(1080x540,@color)'
        ],
        'news|10':[
            '@cword(10,20)'
        ]
    })
}

router.post('/api/v1/playImg',(req,res)=>{
    res.json(homeImg())
})
module.exports=router