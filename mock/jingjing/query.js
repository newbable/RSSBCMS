const {Router} =require ('express')
const Mock=require('mockjs')

const router= new Router()
const query=Mock.mock({
    "code": 200,
    "data": {
        "paragraph": "@cparagraph(14,15)"
        }
})

router.get('/',(req,res)=>{
    res.json(query)
})

module.exports = router