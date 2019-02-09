const {Router} =require('express')
const router=new Router()
const Mock=require('mockjs')
const dismantleList=({limited,offset})=>{
    const start=offset+100
    const totalCount=60
    const currentPage=offset/limited +1
    const isLastPage=currentPage>=totalCount/limited
    const dataCount=isLastPage&&(totalCount%limited)!==0 ? totalCount%limited : limited
    const data=dataCount===1?`data`:`data|${limited}`
    const totalPages=Number.parseInt(totalCount/limited,10)
    return Mock.mock({
        "code":200,
        [data]:[{
            "key|+1":start,
            "number":'@integer(100,300)',
            "reason":'@integer(0,3)',
            "date":'@datetime(T)',
            "applicant":'@cname',
            "undertaker":'@cname'
        }],
        totalCount,
        currentPage,
        dataCount,
        isLastPage,
        totalPages
    })
}
router.post('/api/v1/dismantlelist',(req,res)=>{
    res.json(dismantleList(req.body))
})

module.exports=router