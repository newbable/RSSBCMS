const {Router} =require('express')
const router=new Router()
const Mock=require('mockjs')
const caselist=({limited,offset})=>{
    const start=offset+100
    const totalCount=61
    const currentPage=offset/limited +1
    const isLastPage=currentPage>=totalCount/limited
    const dataCount=isLastPage&&(totalCount%limited)!==0 ? totalCount%limited : limited
    const data=dataCount===1?`data`:`data|${limited}`
    const totalPages=Number.parseInt(totalCount/limited,10)
    return Mock.mock({
        "code":200,
        [data]:[{
            "key|+1":start,
            "area":'@province',
            "number":'@integer(100,300)',
            "date":'@datetime(T)',
            "applicant":'@cname',
            "executor":'@cword(3,6)',
            "undertaker":'@cname',
            "license":'@integer(10,100)'
        }],
        totalCount,
        currentPage,
        dataCount,
        isLastPage,
        totalPages
    })
}
router.post('/api/caselist',(req,res)=>{
    res.json(caselist(req.body))
})

module.exports=router