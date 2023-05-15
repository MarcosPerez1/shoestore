const queries = require("../../models/favourites/index")

module.exports = (db) => async (req, res, next) => {
    const id=req.params.id
    const dbRes = await queries.eraseShoe(await db)(id)

    if (!dbRes.ok) return next({
        statusCode: 500,
        error: new Error("something went wrong!")
    })
    res.status(200).json({
        success: true,
        data: dbRes.response
    })
}