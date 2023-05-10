require ("dotenv").config()
const express=require("express")
const db=require("./configs/db")
const app= express()
const errors =require("./misc/errors")
const cookieParser=require("cookie-parser")

app.use(express.json());
app.use(cookieParser())

const routes=require("./routes")

app.use(routes(db))

app.use((req,res,next)=>{
    next(errors[404])
})


app.use(({statusCode, error}, req,res,next)=>{
    res.status(statusCode).json({
        success: false,
        message:error.message,
    })
})


app.listen(process.env.PORT, ()=> console.info(`>listening at: ${process.env.PORT}`))

