const router=require("express").Router()

const {authorizer}=require("../middlewares")

const {allShoes,shoeXbrand,shoeXsize} =require("../controllers/shoes")


module.exports=(db)=>{ 
    router.get("/all",allShoes(db)),
    router.get("/size",shoeXsize(db))
    router.get("/:brand",shoeXbrand(db))

    return router
}