const router=require("express").Router()
const {authorizer}=require("../middlewares")
const {signup,signin,signout}=require("../controllers/auth")

module.exports=(db)=>{
    router.post("/signup",signup(db))
    router.post("/signin",signin(db))
    router.post("/signout",authorizer,signout())

    return router
}