const {Router} =require ('express')
const Mock=require('mockjs')

const router= new Router()
const query=({offset,limited})=>{
    const data=`data|${limited}`
    const idStart=1000+offset;
   return Mock.mock({
        "code": 200,
        [data]:[
            {
                "id|+1":idStart,
                "applicant":'@cname',
                "carrier":'@cname',
                "department":'@cword(2,4)',
                "status":'@integer(1, 3)',
                "key|+1":1000
           },          
        ],
        totalCount:52
    })
    
}

router.post('/',(req,res)=>{
    res.json(query(req.body))
})

module.exports = router