const queries=require("../../models/shoes/index")
const errors=require("../../misc/errors")
module.exports=(db)=>async (req,res,next)=>{
    const id=req.params.id

    const {brand,size,color,model}=req.body

    const dbRes = await queries.modifyShoe(await db)(id,brand,size,color,model)
    
    if (!dbRes.ok) return next(errors[500])
    res.status(200).json({
        success: true,
        data: dbRes.response
    })
}