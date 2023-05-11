const router=require("express").Router()

const {signup,signin,signout}=require("../controllers/auth")

module.exports=(db)=>{
    router.post("/signup",signup(db))
    router.post("/signin",signin(db))
    router.post("/signout",signout())

    return router
}