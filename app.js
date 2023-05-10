const express=require("express")
const db=require("./configs/db")
const app= express()
require ("dotenv").config()

app.use(express.json());

const routes=require("./routes")

app.use(routes(db))

app.use((req,res,next)=>{
    next({
        statusCode: 404,
        error: new Error("pagina no encontrada"),
    })
})


app.use(({statusCode, error}, req,res,next)=>{
    res.status(statusCode).json({
        success: false,
        message:error.message,
    })
})


app.listen(process.env.PORT, ()=> console.info(`>listening at ${process.env.PORT}`))

