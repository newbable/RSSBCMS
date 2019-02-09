const {Router} =require('express')
const router=new Router()
const Mock = require('mockjs')
const caseIn=({limited,offset})=>{
    // offset=(currentPage-1)*limited
    const currentPage=offset/limited+1
    const totalCount=81
    const lastPage=currentPage>=(totalCount/limited)
    const dataCount=lastPage&&(totalCount%limited)!==0?totalCount%limited:limited
    const data=dataCount===1?`data`:`data|${limited}`
    const start=offset+100
    const totalPages=Number.parseInt(totalCount/limited,10)
    return Mock.mock({
        'code':200,
        [data]:[{
            'key|+1':start,
            'number|+1':100,
            'applicant':'@cname',
            'doman':'@cword(3,5)',
            'undertake':'@cname',
            'date':'@date(T)'
        }],
        currentPage,
        totalCount,
        dataCount,
        totalPages,
        lastPage
    })
}
router.post('/api/v1/casein',(req,res)=>{
    console.log(req.body)
    res.json(caseIn(req.body))
})
module.exports=router