const {Router} =require('express')
const router=new Router()
const Mock=require('mockjs')
const file1=()=>{
    return Mock.mock({
        code:'200',
        'data|50':[{
            'number|+1':'0',
            'reason':'@integer(0,3)',
            'date':'@date',
            'register':'@cname',
            'undertake':'@cword(3,5)',
        }]
    })
}
router.post('/api/v1/caseTable',(req,res)=>{
    res.json(file1())
})
module.exports=router