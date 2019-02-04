const {Router} =require ('express')
const Mock=require('mockjs')

const router= new Router()
const query=Mock.mock({
    "code": 200,
    "data|50":[
        {
            "id|+1":1000,
            "applicant":'@cname',
            "carrier":'@cname',
            "department":'@cword(2,4)',
            "status":'@integer(1, 3)',
            "key|+1":1000
       }
    ]
})

router.get('/',(req,res)=>{
    res.json(query)
})

module.exports = router