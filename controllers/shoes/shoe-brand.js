const queries=require("../../models/shoes/index")

module.exports=(db)=>async (req,res,next)=>{
    const brand = req.params.brand || req.params.Brand

    const dbRes = await queries.shoesBrand(await db)(brand)
    
    if (!dbRes.ok) return next({
        statusCode: 500,
        error: new Error("something went wrong!")
    })
    res.status(200).json({
        success: true,
        data: dbRes.response
    })
}