const router=require("express").Router()

const {signup,signin,signout}=require("../controllers/auth")

module.exports=(db)=>{
    router.post("/signup",signup())
    router.post("/signin",signin())
    router.post("/signout",signout())

    return router
}