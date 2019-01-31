const {Router} =require ('express')
const Mock=require('mockjs')

const router= new Router()
const tongji=Mock.mock({
    "code": 200,
    "data": {
        "paragraph": "@cparagraph(14,19)"
        }
})

router.get('/',(req,res)=>{
    res.json(tongji)
})

module.exports = router