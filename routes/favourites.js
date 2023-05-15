const router=require("express").Router()

const {authorizer}=require("../middlewares")

const {deleteFAV,newFav} =require("../controllers/favourites")


module.exports=(db)=>{

    router.post("/new",authorizer,newFav(db))
    router.post("/:id",authorizer,deleteFAV(db))
    

    return router
}