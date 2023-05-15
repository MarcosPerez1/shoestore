const router=require("express").Router()

const {authorizer}=require("../middlewares")

const {addNewPurchase} =require("../controllers/purchases")


module.exports=(db)=>{

    router.get("/",authorizer,addNewPurchase(db))
    

    return router
}