const router=require("express").Router()

const {authorizer}=require("../middlewares")

const userControllers =require("../controllers/users")

module.exports=()=>{
    router.get("/",authorizer, userControllers.getUser())
    return router
}