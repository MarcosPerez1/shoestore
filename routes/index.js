const router =require("express").Router()

const authRouter=require("./auth")
const userRouter=require("./users")
const shoesRouter=require("./shoes")
const purchasesRouter=require("./purchases")
const favouriteRouter=require("./favourites")

module.exports=(db)=>{
    router.use("/auth",authRouter(db))
    router.use("/users",userRouter(db))
    router.use("/shoes",shoesRouter(db))
    router.use("/purchases",purchasesRouter(db))

    return router
}