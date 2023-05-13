const queries = require("../../models/shoes/index")
const errors = require("../../misc/errors")

module.exports = (db) => async (req, res, next) => {
    const { minSize, maxSize} = req.query
    const dbRes = await queries.sizeShoeRange(await db)(minSize,maxSize)
    
    if (!dbRes.ok) return next(errors[500])
    res.status(200).json({
        success: true,
        data: dbRes.response
    })
}