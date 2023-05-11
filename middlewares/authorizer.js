const {deserialize}=require("simple-stateless-auth-library")
const errors=require("../misc/errors")


module.exports = (req,res, next)=>{
   const payload=deserialize(req)
    

   if(!payload)return next(errors[401])

   res.locals=payload
    next()
}