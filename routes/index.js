const router =require("express").Router()

const authRouter=require("./auth")

module.exports=(db)=>{
    router.use("/auth",authRouter(db))
    return router
}