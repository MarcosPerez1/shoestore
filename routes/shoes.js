const router=require("express").Router()

const {authorizer}=require("../middlewares")

const {allShoes,shoeXbrand,shoeXsize,sizeRange,addShoe,putShoe} =require("../controllers/shoes")


module.exports=(db)=>{ 
    router.post("/new",addShoe(db))
    router.get("/all",allShoes(db)),
    router.get("/sizes",sizeRange(db))
    router.get("/size",shoeXsize(db))
    router.get("/:brand",shoeXbrand(db))
    router.put("/:id",putShoe(db))

    return router
}