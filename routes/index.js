const router =require("express").Router()

const authRouter=require("./auth")
const userRouter=require("./users")

module.exports=(db)=>{
    router.use("/auth",authRouter(db))
    router.use("/users",userRouter())
    return router
}