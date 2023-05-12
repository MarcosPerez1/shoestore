const router=require("express").Router()

const {authorizer}=require("../middlewares")

const {allUsers,getUser} =require("../controllers/users")


module.exports=(db)=>{

    router.get("/",authorizer,getUser())
    router.get("/all",allUsers(db))

    return router
}